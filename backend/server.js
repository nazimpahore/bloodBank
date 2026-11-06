import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import { connectDB, closeDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import receiverRoutes from './routes/receiverRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import { globalLimiter } from './middleware/rateLimitMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security: Disable X-Powered-By & Enable Helmet headers
app.disable('x-powered-by');
app.use(helmet());

// Security: CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (such as mobile apps, curl, or server-to-server) or matching allowed origins
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Cross-Origin Request Blocked by Security Policy'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Security: Body parser size limits & NoSQL injection sanitization
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());

// Security: Global IP Rate Limiting
app.use(globalLimiter);

// Database connection verification
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(503).json({ error: 'Service temporarily unavailable. Database connection failed.' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/receiver', receiverRoutes);
app.use('/api/public', publicRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'LifeDrop Blood Bank Management System API is live and secured.',
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

// Centralized Error Handling Middleware (hiding raw stack/db traces)
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred. Please try again later.'
      : (err.message || 'Internal server error'),
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
