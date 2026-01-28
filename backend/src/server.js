import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection, createPool, createDatabaseIfNotExists, testDatabaseConnection } from './config/database.js';
import createTables from './config/initTables.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import companyRoutes from './routes/company.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
import adminRoutes from './routes/admin.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import resumeAnalysisRoutes from './routes/resumeAnalysis.routes.js';
import chatRoutes from './routes/chat.routes.js';
import interviewRoutes from './routes/interview.routes.js';
import contactRoutes from './routes/contact.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'HackForge API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/resume-analysis', resumeAnalysisRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/contact', contactRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err.message || err);
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const startServer = async () => {
  try {
    // Verify email configuration (if configured)
    if (process.env.SMTP_USER || process.env.EMAIL_USER) {
      const { verifyEmailConfig } = await import('./services/email.service.js');
      await verifyEmailConfig();
    }

    console.log('Checking database connection...');
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Failed to connect to database. Please check your MySQL configuration.');
      process.exit(1);
    }

    console.log('Creating database if not exists...');
    const dbCreated = await createDatabaseIfNotExists();
    if (!dbCreated) {
      console.error('Failed to create database. Please check your MySQL configuration.');
      process.exit(1);
    }

    console.log('Creating database pool...');
    createPool();

    console.log('Testing database pool connection...');
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      console.warn('⚠️  Database pool connection failed. Creating tables...');
      const tablesCreated = await createTables();
      if (tablesCreated) {
        console.log('✅ All tables created successfully!');
      } else {
        console.warn('⚠️  Failed to create some tables. You may need to run "npm run init-db" manually.');
      }
    } else {
      console.log('Checking if tables exist...');
      const tablesCreated = await createTables();
      if (tablesCreated) {
        console.log('✅ Database and tables ready!');
      }
    }

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Database: ${process.env.DB_NAME || 'hackforge_db'}`);
      console.log(`API URL: http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please:`);
        console.error(`1. Stop the process using port ${PORT}`);
        console.error(`2. Or change the PORT in .env file`);
        console.error(`\nTo find and kill the process:`);
        console.error(`  lsof -ti:${PORT} | xargs kill -9`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });
  } catch (err) {
    const error = err || new Error('Unknown error');
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
