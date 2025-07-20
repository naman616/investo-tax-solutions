const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Hardcode for clarity, but user should also set these in Railway variables
process.env.EMAIL_FROM = 'investotaxsolutions@gmail.com';
process.env.EMAIL_TO = 'investotaxsolutions@gmail.com';

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/appointments', async (req, res) => {
  const { name, email, phone = '', service, date = '', notes = '' } = req.body;
  if (!name || !email || !service) {
    return res.status(400).json({ message: 'Missing required fields' });
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

app.post('/api/documents', async (req, res) => {
  const { name, email, phone = '', notes = '' } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Document Submission`,
      html: `
        <h2>New Document Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Notes:</strong> ${notes}</p>
      `,
    });
    return res.status(200).json({ success: true, message: 'Document submission received and email sent!' });
  } catch (error) {
    console.error('RESEND API ERROR:', error);
    return res.status(500).json({ message: 'Server error', error: error.message || error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 