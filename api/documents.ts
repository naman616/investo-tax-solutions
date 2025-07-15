import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import nodemailer from 'nodemailer';
import axios from 'axios';
import mime from 'mime-types';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('FORM PARSE ERROR:', err);
        return res.status(500).json({ message: 'Error parsing form data', error: err });
      }

      const uploadedFiles: any[] = [];
      const attachments: any[] = [];
      try {
        for (const key in files) {
          const file = Array.isArray(files[key]) ? files[key][0] : files[key];
          if (file && file.filepath) {
            // Prepare attachment from local file, rename as field name with original extension
            const ext = path.extname(file.originalFilename || file.original_filename || file.newFilename || file.filepath) || '';
            const renamedFilename = key + ext;
            const fileBuffer = fs.readFileSync(file.filepath);
            const mimeType = mime.lookup(renamedFilename) || 'application/octet-stream';
            attachments.push({
              filename: renamedFilename,
              content: fileBuffer,
              contentType: mimeType,
            });
            // Upload to Cloudinary for backup
            const streamUpload = () => {
              return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  {
                    folder: `investo-tax-solutions/${fields.email || 'unknown'}`,
                    resource_type: 'raw',
                    use_filename: true,
                    unique_filename: false,
                  },
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
                fs.createReadStream(file.filepath).pipe(stream);
              });
            };
            let uploadResult;
            try {
              uploadResult = await streamUpload();
            } catch (err) {
              console.error('CLOUDINARY UPLOAD_STREAM ERROR:', err);
              return res.status(500).json({ message: 'File upload failed', error: err });
            }
            uploadedFiles.push({
              field: key,
              url: uploadResult.secure_url,
              original_filename: uploadResult.original_filename,
              public_id: uploadResult.public_id,
            });
            try {
              fs.unlinkSync(file.filepath);
            } catch (fsErr) {
              console.error('FS UNLINK ERROR:', fsErr);
            }
          }
        }
      } catch (uploadErr) {
        console.error('CLOUDINARY UPLOAD ERROR:', uploadErr);
        return res.status(500).json({ message: 'File upload failed', error: uploadErr });
      }

      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASS,
          },
        });

        const fileLinks = uploadedFiles.map(f => {
          const downloadUrl = `${f.url}?attachment=${encodeURIComponent(f.original_filename)}`;
          return `<li><a href="${downloadUrl}">${f.field} (${f.original_filename})</a></li>`;
        }).join('');
        const html = `
          <h2>New Document Submission</h2>
          <p><strong>Name:</strong> ${fields.name}</p>
          <p><strong>Email:</strong> ${fields.email}</p>
          <p><strong>Phone:</strong> ${fields.phone}</p>
          <p><strong>Files:</strong></p>
          <ul>${fileLinks}</ul>
        `;

        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_TO,
          subject: 'New Document Submission - Investo Tax Solutions',
          html,
          attachments,
        });
      } catch (mailErr) {
        console.error('EMAIL SEND ERROR:', mailErr);
        return res.status(500).json({ message: 'Email send failed', error: mailErr });
      }

      return res.status(200).json({ success: true, files: uploadedFiles });
    });
  } catch (err) {
    console.error('TOP LEVEL ERROR:', err);
    return res.status(500).json({ message: 'Top level error', error: err });
  }
} 