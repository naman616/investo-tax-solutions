import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM admin_users');
    if (Array.isArray(rows) && rows[0].count > 0) {
      await connection.end();
      return res.status(403).json({ message: 'Admin user already exists' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    await connection.execute('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)', [username, password_hash]);
    await connection.end();
    return res.status(201).json({ success: true, message: 'Admin user created' });
  } catch (error) {
    return res.status(500).json({ message: 'Database error', error });
  }
} 