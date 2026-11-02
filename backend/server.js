import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, closeDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import receiverRoutes from './routes/receiverRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/receiver', receiverRoutes);
app.use('/api/public', publicRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'LifeDrop Blood Bank Management System API is live.',
    timestamp: new Date().toISOString(),
  });
});

// Root API info
app.get('/', (req, res) => {
  res.json({
    name: 'LifeDrop API',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 LifeDrop Backend Server running on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: Port ${PORT} is already in use by another running process.`);
        console.error(`👉 Stop the existing process running on port ${PORT}, or change PORT in backend/.env\n`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
      }
    });

    // Graceful shutdown
    const handleShutdown = async () => {
      console.log('\n🛑 Shutting down server gracefully...');
      server.close(async () => {
        await closeDB();
        console.log('✅ Server and database closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

export default app;

if (!process.env.VERCEL) {
  startServer();
}
