import mysql from 'mysql2/promise';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL!);
      await connection.execute(
        'INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)',
        [title, content, author]
      );
      await connection.end();
      return res.status(200).json({ success: true, message: 'Blog post created!' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Database error', error });
    }
  }
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL!);
      const [rows] = await connection.execute('SELECT * FROM blogs ORDER BY created_at DESC');
      await connection.end();
      return res.status(200).json({ blogs: rows });
    } catch (error: any) {
      return res.status(500).json({ message: 'Database error', error });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
} 