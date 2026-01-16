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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
