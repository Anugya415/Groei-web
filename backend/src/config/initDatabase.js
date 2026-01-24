import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../../.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};

const dbName = process.env.DB_NAME || 'hackforge_db';

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' created or already exists`);

    await connection.query(`USE \`${dbName}\``);

    const schemaSQL = `
CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  industry VARCHAR(100),
  location VARCHAR(255),
  size VARCHAR(50),
  employees VARCHAR(50),
  description TEXT,
  website VARCHAR(255),
  founded INT,
  rating DECIMAL(3,1) DEFAULT 0.0,
  verified BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  logo VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_verified (verified),
  INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  phone VARCHAR(50),
  location VARCHAR(255),
  title VARCHAR(255),
  company_id INT,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  verification_token_expires DATETIME,
  password_reset_token VARCHAR(255),
  password_reset_expires DATETIME,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_company (company_id),
  INDEX idx_status (status),
  INDEX idx_verification_token (verification_token),
  INDEX idx_password_reset_token (password_reset_token),
  INDEX idx_email_verified (email_verified)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  salary_currency VARCHAR(10) DEFAULT 'INR',
  type ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote') DEFAULT 'Full-time',
  experience_level VARCHAR(50),
  skills_required TEXT,
  status ENUM('active', 'closed', 'draft') DEFAULT 'active',
  posted_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_company (company_id),
  INDEX idx_status (status),
  INDEX idx_title (title),
  FULLTEXT idx_search (title, description, location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  company_id INT NOT NULL,
  status ENUM('Application Sent', 'Under Review', 'Interview Scheduled', 'Accepted', 'Rejected') DEFAULT 'Application Sent',
  match_score INT DEFAULT 0,
  resume_url VARCHAR(500),
  cover_letter TEXT,
  notes TEXT,
  interview_date DATETIME,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_job (job_id),
  INDEX idx_company (company_id),
  INDEX idx_status (status),
  INDEX idx_applied_at (applied_at),
  UNIQUE KEY unique_application (user_id, job_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS resumes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_size INT,
  version INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  parsed_data JSON,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  skills TEXT,
  experience TEXT,
  education TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS saved_jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  UNIQUE KEY unique_saved_job (user_id, job_id),
  INDEX idx_user (user_id),
  INDEX idx_job (job_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS interviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id INT NOT NULL,
  scheduled_at DATETIME NOT NULL,
  type ENUM('Phone', 'Video', 'In-person', 'Technical') DEFAULT 'Video',
  location VARCHAR(255),
  meeting_link VARCHAR(500),
  notes TEXT,
  status ENUM('scheduled', 'completed', 'cancelled', 'rescheduled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  INDEX idx_application (application_id),
  INDEX idx_scheduled_at (scheduled_at),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_read (is_read),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email_notifications BOOLEAN DEFAULT TRUE,
  application_alerts BOOLEAN DEFAULT TRUE,
  weekly_reports BOOLEAN DEFAULT TRUE,
  system_updates BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_admin_settings (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS analytics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT,
  date DATE NOT NULL,
  total_applications INT DEFAULT 0,
  new_applications INT DEFAULT 0,
  interviews_scheduled INT DEFAULT 0,
  accepted INT DEFAULT 0,
  rejected INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  UNIQUE KEY unique_analytics (company_id, date),
  INDEX idx_company (company_id),
  INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

    const statements = schemaSQL.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.query(statement);
        } catch (error) {
          if (error.code !== 'ER_TABLE_EXISTS_ERROR') {
            console.error('Error creating table:', error.message);
          }
        }
      }
    }

    const columnsToAdd = [
      { name: 'bio', type: 'TEXT' },
      { name: 'experience', type: 'VARCHAR(255)' },
      { name: 'education', type: 'VARCHAR(255)' },
      { name: 'skills', type: 'TEXT' },
      { name: 'linkedin', type: 'VARCHAR(255)' },
      { name: 'github', type: 'VARCHAR(255)' },
      { name: 'portfolio', type: 'VARCHAR(255)' },
      { name: 'email_verified', type: 'BOOLEAN DEFAULT FALSE' },
      { name: 'verification_token', type: 'VARCHAR(255)' },
      { name: 'verification_token_expires', type: 'DATETIME' },
      { name: 'password_reset_token', type: 'VARCHAR(255)' },
      { name: 'password_reset_expires', type: 'DATETIME' },
    ];

    for (const column of columnsToAdd) {
      try {
        const [columns] = await connection.query(
          `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = ?`,
          [dbName, column.name]
        );

        if (columns.length === 0) {
          await connection.query(
            `ALTER TABLE users ADD COLUMN ${column.name} ${column.type}`
          );
          console.log(`Added column '${column.name}' to users table`);
        }
      } catch (error) {
        if (error.code !== 'ER_DUP_FIELDNAME') {
          console.error(`Error adding column '${column.name}':`, error.message);
        }
      }
    }


    console.log('All tables created successfully');

    await connection.end();
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

createDatabase();
