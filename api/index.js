import { connectDB } from '../backend/config/db.js';
import app from '../backend/server.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Serverless API handler error:', error);
    return res.status(500).json({
      error: 'Database connection failed',
      details: error.message,
    });
  }
}

