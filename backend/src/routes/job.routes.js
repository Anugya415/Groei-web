import express from 'express';
import { getPool } from '../config/database.js';
import { authenticate, requireAdmin, requireCompany } from '../middleware/auth.middleware.js';
import { validateJob } from '../utils/validation.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const { search, location, type, company_id, status = 'active' } = req.query;
    
    let query = `
      SELECT j.*, c.name as company_name, c.logo as company_logo
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE j.status = ?
    `;
    const params = [status];
    
    if (search) {
      query += ' AND (j.title LIKE ? OR j.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    if (location) {
      query += ' AND j.location LIKE ?';
      params.push(`%${location}%`);
    }
    
    if (type) {
      query += ' AND j.type = ?';
      params.push(type);
    }
    
    if (company_id) {
      query += ' AND j.company_id = ?';
      params.push(company_id);
    }
    
    query += ' ORDER BY j.created_at DESC';
    
    const [jobs] = await pool.query(query, params);
    res.json({ jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pool = getPool();
    const [jobs] = await pool.query(
      `SELECT j.*, c.name as company_name, c.logo as company_logo, 
              c.description as company_description, c.location as company_location
       FROM jobs j
       JOIN companies c ON j.company_id = c.id
       WHERE j.id = ?`,
      [req.params.id]
    );
    
    if (jobs.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({ job: jobs[0] });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

router.post('/', authenticate, requireAdmin, requireCompany, validateJob, async (req, res) => {
  try {
    const pool = getPool();
    const { title, description, location, salary_min, salary_max, type, experience_level, skills_required } = req.body;
    
    if (!req.user.company_id) {
      return res.status(400).json({ error: 'Company association required. Please contact support.' });
    }
    
    const salaryMin = salary_min ? parseFloat(salary_min) : null;
    const salaryMax = salary_max ? parseFloat(salary_max) : null;
    
    if (salaryMin && salaryMax && salaryMin > salaryMax) {
      return res.status(400).json({ error: 'Minimum salary cannot be greater than maximum salary' });
    }
    
    const [result] = await pool.query(
      `INSERT INTO jobs (company_id, title, description, location, salary_min, salary_max, type, experience_level, skills_required, posted_by, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [req.user.company_id, title, description, location, salaryMin, salaryMax, type, experience_level || null, skills_required || null, req.user.id]
    );
    
    const [jobs] = await pool.query(
      `SELECT j.*, c.name as company_name, c.logo as company_logo
       FROM jobs j 
       JOIN companies c ON j.company_id = c.id 
       WHERE j.id = ?`,
      [result.insertId]
    );
    
    if (jobs.length === 0) {
      return res.status(500).json({ error: 'Failed to retrieve created job' });
    }
    
    res.status(201).json({ job: jobs[0], message: 'Job posted successfully' });
  } catch (error) {
    console.error('Create job error:', error);
    
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid company association' });
    }
    
    res.status(500).json({ error: error.message || 'Failed to create job' });
  }
});

router.get('/company/my', authenticate, requireAdmin, requireCompany, async (req, res) => {
  try {
    const pool = getPool();
    const [jobs] = await pool.query(
      'SELECT * FROM jobs WHERE company_id = ? ORDER BY created_at DESC',
      [req.user.company_id]
    );
    res.json({ jobs });
  } catch (error) {
    console.error('Get company jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

export default router;
