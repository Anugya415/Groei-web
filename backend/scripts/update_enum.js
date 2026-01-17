
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from backend root
dotenv.config({ path: path.join(process.cwd(), '.env') });

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hackforge_db',
};

const updateSchema = async () => {
    let connection;
    try {
        console.log('Connecting to database...');
        connection = await mysql.createConnection(dbConfig);

        console.log('Updating jobs table enum...');
        // Update the ENUM definition to include 'Project'
        await connection.query(`
      ALTER TABLE jobs 
      MODIFY COLUMN type ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Project') DEFAULT 'Full-time'
    `);

        console.log('✅ Successfully added "Project" to jobs type enum');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        if (connection) await connection.end();
    }
};

updateSchema();
