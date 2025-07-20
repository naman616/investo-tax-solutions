const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const formidable = require('formidable');
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/appointments', async (req, res) => {
  console.log('Received POST /api/appointments');
  const { name, email, phone = '', service, date = '', notes = '' } = req.body;
  if (!name || !email || !service) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const requiredEnvs = [
    'RESEND_API_KEY',
    'EMAIL_FROM',
    'EMAIL_TO',
  ];
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);
  if (missingEnvs.length > 0) {
    return res.status(500).json({ message: `Missing environment variables: ${missingEnvs.join(', ')}` });
  }
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Appointment Booking - ${service}`,
      html: `
        <h2>New Appointment Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        ${date ? `<p><strong>Date:</strong> ${date}</p>` : ''}
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
      `,
    });
    return res.status(200).json({ success: true, message: 'Appointment received and email sent!' });
  } catch (error) {
    console.error('RESEND API ERROR:', error);
    return res.status(500).json({ message: 'Server error', error: error.message || error });
  }
});

app.post('/api/documents', (req, res) => {
  console.log('Received POST /api/documents');
  const form = new formidable.IncomingForm({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data', error: err.message });
    }
    const uploadedFiles = [];
    const attachments = [];
    try {
      for (const key in files) {
        const file = Array.isArray(files[key]) ? files[key][0] : files[key];
        if (file && file.filepath) {
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
            return res.status(500).json({ message: 'File upload failed', error: err.message });
          }
          uploadedFiles.push({
            field: key,
            url: uploadResult.secure_url,
            original_filename: uploadResult.original_filename,
            public_id: uploadResult.public_id,
          });
          try {
            fs.unlinkSync(file.filepath);
          } catch (fsErr) {}
        }
      }
    } catch (uploadErr) {
      return res.status(500).json({ message: 'File upload failed', error: uploadErr.message });
    }
    // Send email with Resend
    try {
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
      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'New Document Submission - Investo Tax Solutions',
        html,
        attachments,
      });
    } catch (mailErr) {
      return res.status(500).json({ message: 'Email send failed', error: mailErr.message });
    }
    return res.status(200).json({ success: true, files: uploadedFiles });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 