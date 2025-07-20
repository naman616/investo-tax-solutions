import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

/**
 * API handler for admin login.
 * Accepts POST requests with username and password.
 * Returns a mock session token on success.
 *
 * Required environment variable: DATABASE_URL
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract and validate credentials
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  // Allow hardcoded admin login for demo/testing
  if (username === 'admin' && password === 'admin123') {
    return res.status(200).json({ success: true, token: 'mock-session-token' });
  }

  try {
    // Connect to the database
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    const [rows] = await connection.execute('SELECT * FROM admin_users WHERE username = ?', [username]);
    await connection.end();
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];
    // Compare password hash
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // TODO: Set a secure session cookie or return a JWT
    return res.status(200).json({ success: true, token: 'mock-session-token' });
  } catch (error) {
    return res.status(500).json({ message: 'Database error', error });
  }
} 