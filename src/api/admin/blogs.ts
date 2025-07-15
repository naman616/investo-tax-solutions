import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.headers.authorization;
  if (token !== 'Bearer mock-session-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    if (req.method === 'POST') {
      const { title, content, author } = req.body;
      if (!title || !content || !author) {
        await connection.end();
        return res.status(400).json({ message: 'Missing required fields' });
      }
      await connection.execute('INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)', [title, content, author]);
      await connection.end();
      return res.status(201).json({ success: true, message: 'Blog post created' });
    }
    if (req.method === 'PUT') {
      const { id, title, content, author } = req.body;
      if (!id || !title || !content || !author) {
        await connection.end();
        return res.status(400).json({ message: 'Missing required fields' });
      }
      await connection.execute('UPDATE blogs SET title = ?, content = ?, author = ? WHERE id = ?', [title, content, author, id]);
      await connection.end();
      return res.status(200).json({ success: true, message: 'Blog post updated' });
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) {
        await connection.end();
        return res.status(400).json({ message: 'Missing blog id' });
      }
      await connection.execute('DELETE FROM blogs WHERE id = ?', [id]);
      await connection.end();
      return res.status(200).json({ success: true, message: 'Blog post deleted' });
    }
    if (req.method === 'GET') {
      const [rows] = await connection.execute('SELECT * FROM blogs ORDER BY created_at DESC');
      await connection.end();
      return res.status(200).json({ blogs: rows });
    }
    await connection.end();
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ message: 'Database error', error });
  }
} 