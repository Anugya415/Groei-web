# HackForge Backend API

Backend API for HackForge job platform built with Express.js and MySQL.

## Features

- User authentication (Job Seekers & Recruiters)
- Company management
- Job posting and management
- Application tracking
- Admin dashboard with analytics
- Company-scoped access control

## Tech Stack

- **Node.js** with Express.js
- **MySQL** database
- **JWT** authentication
- **bcryptjs** for password hashing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```
NODE_ENV=development
PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hackforge_db

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10
```

3. Initialize database:
```bash
npm run init-db
```

This will create the database and all required tables.

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `GET /api/companies/my/company` - Get recruiter's company (requires admin)
- `PUT /api/companies/my/company` - Update company (requires admin)

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (requires admin)
- `GET /api/jobs/company/my` - Get company's jobs (requires admin)

### Applications
- `POST /api/applications` - Submit application (requires auth)
- `GET /api/applications/my` - Get user's applications (requires auth)
- `GET /api/applications/company` - Get company applications (requires admin)
- `PUT /api/applications/:id/status` - Update application status (requires admin)

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats (requires admin)
- `GET /api/admin/settings` - Get admin settings (requires admin)
- `PUT /api/admin/settings` - Update admin settings (requires admin)

### Analytics
- `GET /api/analytics/company` - Get company analytics (requires admin)

## Database Schema

The database includes the following tables:
- `companies` - Company information
- `users` - User accounts (job seekers & recruiters)
- `jobs` - Job postings
- `applications` - Job applications
- `resumes` - User resumes
- `saved_jobs` - Saved jobs by users
- `interviews` - Interview scheduling
- `notifications` - User notifications
- `admin_settings` - Admin notification preferences
- `analytics` - Analytics data

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Company-scoped access control for admins
- Input validation with express-validator

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 8080)
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRES_IN` - JWT expiration time
- `BCRYPT_SALT_ROUNDS` - Bcrypt salt rounds
