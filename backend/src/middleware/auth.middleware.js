import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPool } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'hackforge-default-secret-change-in-production';
    const decoded = jwt.verify(token, jwtSecret);
    const pool = getPool();

    const [users] = await pool.query(
      'SELECT id, name, email, role, company_id, status FROM users WHERE id = ? AND status = ?',
      [decoded.userId, 'active']
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    req.user = users[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(500).json({ error: 'Authentication error' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const requireCompany = (req, res, next) => {
  if (!req.user.company_id) {
    return res.status(403).json({
      error: 'Company association required',
      message: 'Your account is not associated with a company. Please contact support or update your profile.'
    });
  }
  next();
};
