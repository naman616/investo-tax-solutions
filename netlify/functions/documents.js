const { Resend } = require('resend');
const formidable = require('formidable');
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  // Netlify functions don't support streaming natively, so we need to decode the body
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];
  if (!contentType || !contentType.startsWith('multipart/form-data')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid content type' })
    };
  }

  // Parse multipart form data
  const boundary = contentType.split('boundary=')[1];
  const buffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
  const form = new formidable.IncomingForm({ multiples: true });

  // Promisify formidable parsing
  const parseForm = () => new Promise((resolve, reject) => {
    form.parse({ headers: { 'content-type': contentType }, buffer }, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  let fields, files;
  try {
    ({ fields, files } = await parseForm());
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error parsing form data', error: err.message })
    };
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
          return {
            statusCode: 500,
            body: JSON.stringify({ message: 'File upload failed', error: err.message })
          };
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
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'File upload failed', error: uploadErr.message })
    };
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
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Email send failed', error: mailErr.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, files: uploadedFiles })
  };
}; 