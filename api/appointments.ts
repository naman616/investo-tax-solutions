import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone = '', service, date = '', notes = '' } = req.body;
  if (!name || !email || !service) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check required environment variables
  const requiredEnvs = [
    'EMAIL_FROM',
    'EMAIL_PASS',
    'EMAIL_TO',
    'SMTP_HOST',
    'SMTP_PORT',
  ];
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);
  if (missingEnvs.length > 0) {
    return res.status(500).json({ message: `Missing environment variables: ${missingEnvs.join(', ')}` });
  }

  // Log environment variables for debugging (do not log secrets)
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
  console.log('EMAIL_TO:', process.env.EMAIL_TO);
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);

  try {
    // Store in database (optional, can be removed if not needed)
    if (process.env.DATABASE_URL) {
      try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL!);
        await connection.execute(
          'INSERT INTO appointments (name, email, phone, service, date, notes) VALUES (?, ?, ?, ?, ?, ?)',
          [name, email, phone, service, date, notes]
        );
        await connection.end();
      } catch (dbErr) {
        console.error('DB ERROR:', dbErr);
        // Continue even if DB fails
      }
    }

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
      <h2>New Appointment Booking</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      ${date ? `<p><strong>Date:</strong> ${date}</p>` : ''}
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Appointment Booking - ${service}`,
      html,
    });

    return res.status(200).json({ success: true, message: 'Appointment received and email sent!' });
  } catch (error) {
    console.error('APPOINTMENT API ERROR:', error);
    if (error && error.response) {
      console.error('Error response:', error.response);
    }
    if (error && error.stack) {
      console.error('Error stack:', error.stack);
    }
    // Log all envs for debugging
    console.error('ENV DEBUG:', {
      EMAIL_FROM: process.env.EMAIL_FROM,
      EMAIL_TO: process.env.EMAIL_TO,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      EMAIL_PASS_SET: !!process.env.EMAIL_PASS,
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
    });
    return res.status(500).json({ message: 'Server error', error: error?.message || error });
  }
} 