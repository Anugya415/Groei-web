import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};

let pool = null;

export const createConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Error creating database connection:', error);
    throw error;
  }
};

export const createPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      database: process.env.DB_NAME || 'hackforge_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
};

export const getPool = () => {
  if (!pool) {
    return createPool();
  }
  return pool;
};

export const createDatabaseIfNotExists = async () => {
  try {
    const connection = await createConnection();
    const dbName = process.env.DB_NAME || 'hackforge_db';
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' checked/created`);
    
    await connection.end();
    return true;
  } catch (error) {
    console.error('Error creating database:', error.message);
    return false;
  }
};

export const testConnection = async () => {
  try {
    const connection = await createConnection();
    await connection.ping();
    await connection.end();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

export const testDatabaseConnection = async () => {
  try {
    const pool = getPool();
    await pool.query('SELECT 1');
    console.log('Database pool connection successful');
    return true;
  } catch (error) {
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('Database does not exist, creating...');
      const created = await createDatabaseIfNotExists();
      if (created) {
        return testDatabaseConnection();
      }
    }
    console.error('Database connection failed:', error.message);
    return false;
  }
};
