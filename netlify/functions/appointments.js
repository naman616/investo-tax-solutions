const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }
  const data = JSON.parse(event.body);
  const { name, email, phone = '', service, date = '', notes = '' } = data;
  if (!name || !email || !service) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' })
    };
  }
  const requiredEnvs = [
    'RESEND_API_KEY',
    'EMAIL_FROM',
    'EMAIL_TO',
  ];
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);
  if (missingEnvs.length > 0) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Missing environment variables: ${missingEnvs.join(', ')}` })
    };
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
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Appointment received and email sent!' })
    };
  } catch (error) {
    console.error('RESEND API ERROR:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message || error })
    };
  }
}; 