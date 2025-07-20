import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const token = req.headers.authorization;
  if (token !== 'Bearer mock-session-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    const [rows] = await connection.execute('SELECT * FROM reviews ORDER BY created_at DESC');
    await connection.end();
    return res.status(200).json({ reviews: rows });
  } catch (error) {
    return res.status(500).json({ message: 'Database error', error });
  }
} 