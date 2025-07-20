import mysql from 'mysql2/promise';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { name, email, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    await connection.execute(
      'INSERT INTO reviews (name, email, rating, comment) VALUES (?, ?, ?, ?)',
      [name, email, rating, comment]
    );
    await connection.end();
    return res.status(200).json({ success: true, message: 'Review received!' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Database error', error });
  }
} 