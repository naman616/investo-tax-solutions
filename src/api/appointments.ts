import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, service, date, notes } = req.body;
  if (!name || !email || !service || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    await connection.execute(
      'INSERT INTO appointments (name, email, phone, service, date, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, service, date, notes]
    );
    await connection.end();
    return res.status(200).json({ success: true, message: 'Appointment received!' });
  } catch (error) {
    return res.status(500).json({ message: 'Database error', error });
  }
} 