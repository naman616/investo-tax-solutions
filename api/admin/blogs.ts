import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

/**
 * API handler for admin blog management.
 * Supports POST (create), PUT (update), DELETE (remove), and GET (list) blog posts.
 * Requires admin authentication via Authorization header.
 *
 * Required environment variable: DATABASE_URL
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check for admin token
  const token = req.headers.authorization;
  if (token !== 'Bearer mock-session-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    // Connect to the database
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    if (req.method === 'POST') {
      // Create a new blog post
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
      // Update an existing blog post
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
      // Delete a blog post
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
      // List all blog posts
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