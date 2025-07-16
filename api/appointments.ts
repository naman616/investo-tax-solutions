import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, service, date, notes } = req.body;
  if (!name || !email || !service) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Store in database (optional, can be removed if not needed)
    if (process.env.DATABASE_URL) {
      const connection = await mysql.createConnection(process.env.DATABASE_URL!);
      await connection.execute(
        'INSERT INTO appointments (name, email, phone, service, date, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, phone, service, date || '', notes || '']
      );
      await connection.end();
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
    return res.status(500).json({ message: 'Server error', error });
  }
} 