import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getPool } from '../config/database.js';

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, role = 'user', company } = req.body;
    const pool = getPool();
    
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    let companyId = null;
    if (role === 'admin') {
      if (!company || company.trim() === '') {
        return res.status(400).json({ error: 'Company name is required for admin signup' });
      }
      
      const [companies] = await pool.query(
        'SELECT id FROM companies WHERE name = ?',
        [company.trim()]
      );
      
      if (companies.length > 0) {
        companyId = companies[0].id;
      } else {
        const [result] = await pool.query(
          'INSERT INTO companies (name, verified, featured) VALUES (?, ?, ?)',
          [company.trim(), false, false]
        );
        companyId = result.insertId;
      }
    }
    
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
    
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, company_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, companyId]
    );
    
    if (role === 'admin' && companyId) {
      await pool.query(
        'INSERT INTO admin_settings (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = user_id',
        [result.insertId]
      );
    }
    
    const jwtSecret = process.env.JWT_SECRET || 'hackforge-default-secret-change-in-production';
    if (!process.env.JWT_SECRET) {
      console.warn('⚠️  WARNING: Using default JWT_SECRET. Set JWT_SECRET in .env for production!');
    }
    
    const token = jwt.sign(
      { userId: result.insertId, email, role },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    const [companies] = companyId ? await pool.query(
      'SELECT name FROM companies WHERE id = ?',
      [companyId]
    ) : [[null]];
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role,
        company_id: companyId,
        company_name: companies[0]?.name || null,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    if (error.code === 'ER_BAD_DB_ERROR') {
      return res.status(500).json({ error: 'Database not initialized. Please run: npm run init-db' });
    }
    res.status(500).json({ error: error.message || 'Failed to create user' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = getPool();
    
    const [users] = await pool.query(
      'SELECT id, name, email, password, role, company_id, status FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    if (user.status !== 'active') {
      return res.status(401).json({ error: 'Account is inactive' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const jwtSecret = process.env.JWT_SECRET || 'hackforge-default-secret-change-in-production';
    if (!jwtSecret || jwtSecret === 'hackforge-default-secret-change-in-production') {
      console.warn('⚠️  WARNING: Using default JWT_SECRET. Set JWT_SECRET in .env for production!');
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    const [companies] = user.company_id ? await pool.query(
      'SELECT name FROM companies WHERE id = ?',
      [user.company_id]
    ) : [[null]];
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company_id: user.company_id,
        company_name: companies[0]?.name || null,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error.code === 'ER_BAD_DB_ERROR') {
      return res.status(500).json({ error: 'Database not initialized. Please run: npm run init-db' });
    }
    res.status(500).json({ error: error.message || 'Failed to login' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;
    
    try {
      const [users] = await pool.query(
        `SELECT u.id, u.name, u.email, u.role, u.phone, u.location, u.title, u.company_id, 
                u.bio, u.experience, u.education, u.skills, u.linkedin, u.github, u.portfolio,
                c.name as company_name
         FROM users u
         LEFT JOIN companies c ON u.company_id = c.id
         WHERE u.id = ?`,
        [userId]
      );
      
      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ user: users[0] });
    } catch (queryError) {
      if (queryError.code === 'ER_BAD_FIELD_ERROR') {
        const [users] = await pool.query(
          `SELECT u.id, u.name, u.email, u.role, u.phone, u.location, u.title, u.company_id, 
                  c.name as company_name
           FROM users u
           LEFT JOIN companies c ON u.company_id = c.id
           WHERE u.id = ?`,
          [userId]
        );
        
        if (users.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        const user = users[0];
        user.bio = null;
        user.experience = null;
        user.education = null;
        user.skills = null;
        user.linkedin = null;
        user.github = null;
        user.portfolio = null;
        
        res.json({ user });
      } else {
        throw queryError;
      }
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;
    const { phone, location, title, bio, experience, education, skills, linkedin, github, portfolio } = req.body;
    
    const updateFields = [];
    const updateValues = [];
    
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (location !== undefined) {
      updateFields.push('location = ?');
      updateValues.push(location);
    }
    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (bio !== undefined) {
      updateFields.push('bio = ?');
      updateValues.push(bio);
    }
    if (experience !== undefined) {
      updateFields.push('experience = ?');
      updateValues.push(experience);
    }
    if (education !== undefined) {
      updateFields.push('education = ?');
      updateValues.push(education);
    }
    if (skills !== undefined) {
      updateFields.push('skills = ?');
      updateValues.push(skills);
    }
    if (linkedin !== undefined) {
      updateFields.push('linkedin = ?');
      updateValues.push(linkedin);
    }
    if (github !== undefined) {
      updateFields.push('github = ?');
      updateValues.push(github);
    }
    if (portfolio !== undefined) {
      updateFields.push('portfolio = ?');
      updateValues.push(portfolio);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(userId);
    
    await pool.query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    const [users] = await pool.query(
      `SELECT u.id, u.name, u.email, u.role, u.phone, u.location, u.title, u.company_id, 
              u.bio, u.experience, u.education, u.skills, u.linkedin, u.github, u.portfolio,
              c.name as company_name
       FROM users u
       LEFT JOIN companies c ON u.company_id = c.id
       WHERE u.id = ?`,
      [userId]
    );
    
    res.json({ user: users[0], message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
