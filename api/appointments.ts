import nodemailer from 'nodemailer';

/**
 * API handler for appointment bookings.
 * Accepts POST requests with name, email, phone, service, date, and notes.
 * Sends an email notification to the admin.
 *
 * Required environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO
 */
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  // Extract and validate required fields
  const { name, email, phone = '', service, date = '', notes = '' } = req.body;
  if (!name || !email || !service) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // Check for required environment variables
  const requiredEnvs = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'EMAIL_FROM',
    'EMAIL_TO',
  ];
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);
  if (missingEnvs.length > 0) {
    return res.status(500).json({ message: `Missing environment variables: ${missingEnvs.join(', ')}` });
  }
  try {
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
    // Send appointment email
    await transporter.sendMail({
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
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message || error });
  }
} 