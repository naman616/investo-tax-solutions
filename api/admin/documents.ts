import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable, { File as FormidableFile, Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import mime from 'mime-types';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * API handler for document uploads.
 * Accepts POST requests with multipart/form-data (fields: name, email, phone, files).
 * Sends uploaded files as email attachments to the admin.
 *
 * Required environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Ensure upload directory exists
  const uploadDir = path.join('/tmp', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Configure formidable for file parsing
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir,
  });

  // Parse the incoming form data
  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      console.error('Form error:', err);
      return res.status(400).json({ message: 'Error parsing form data', error: err });
    }

    try {
      const fileInfos: any[] = [];
      const attachments: any[] = [];

      // Prepare file info and attachments for email
      Object.entries(files).forEach(([field, fileObj]) => {
        const fileArray = Array.isArray(fileObj) ? fileObj : [fileObj];
        fileArray.forEach((f: FormidableFile) => {
          const fileInfo = {
            field,
            name: f.originalFilename || f.newFilename || 'document',
            path: f.filepath,
            size: f.size,
            type: f.mimetype,
          };
          fileInfos.push(fileInfo);
          attachments.push({
            filename: fileInfo.name,
            content: fs.readFileSync(fileInfo.path),
            contentType: fileInfo.type || mime.lookup(fileInfo.name) || 'application/octet-stream',
          });
        });
      });

      // Check for required environment variables
      const requiredEnvs = [
        'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER',
        'SMTP_PASS', 'EMAIL_FROM', 'EMAIL_TO'
      ];
      const missing = requiredEnvs.filter(k => !process.env[k]);
      if (missing.length > 0) {
        return res.status(500).json({ message: `Missing env vars: ${missing.join(', ')}` });
      }

      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send email with attachments
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `New Document Submission from ${fields.name || 'Anonymous'}`,
        html: `
          <h2>New Submission</h2>
          <p><strong>Name:</strong> ${fields.name || 'Not Provided'}</p>
          <p><strong>Email:</strong> ${fields.email || 'Not Provided'}</p>
          <p><strong>Phone:</strong> ${fields.phone || 'Not Provided'}</p>
          <p><strong>Files:</strong> ${fileInfos.map(f => f.name).join(', ')}</p>
        `,
        attachments,
      });

      // Clean up temp files after sending
      fileInfos.forEach(file => {
        try {
          if (fs.existsSync(file.path)) {

            fs.unlinkSync(file.path);
          }
        } catch (e) {
          console.warn(`Failed to delete file: ${file.path}`);
        }
      });

      return res.status(200).json({ message: 'Email sent with uploaded documents.' });

    } catch (error) {
      console.error('Email error:', error);
      return res.status(500).json({ message: 'Failed to send email', error: (error as Error).message });
    }
  });
}
