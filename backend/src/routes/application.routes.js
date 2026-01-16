import express from 'express';
import { getPool } from '../config/database.js';
import { authenticate, requireAdmin, requireCompany } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  try {
    const pool = getPool();
    const { job_id, cover_letter, resume_url } = req.body;
    
    const [jobs] = await pool.query(
      'SELECT company_id FROM jobs WHERE id = ?',
      [job_id]
    );
    
    if (jobs.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    const companyId = jobs[0].company_id;
    
    const [existing] = await pool.query(
      'SELECT id FROM applications WHERE user_id = ? AND job_id = ?',
      [req.user.id, job_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Application already submitted' });
    }
    
    const [result] = await pool.query(
      `INSERT INTO applications (user_id, job_id, company_id, cover_letter, resume_url, match_score)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, job_id, companyId, cover_letter || '', resume_url || '', 0]
    );
    
    const [applications] = await pool.query(
      `SELECT a.*, j.title as job_title, c.name as company_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON a.company_id = c.id
       WHERE a.id = ?`,
      [result.insertId]
    );
    
    res.status(201).json({ application: applications[0], message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

router.get('/my', authenticate, async (req, res) => {
  try {
    const pool = getPool();
    const [applications] = await pool.query(
      `SELECT a.*, j.title as job_title, j.location as job_location, 
              c.name as company_name, c.logo as company_logo
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON a.company_id = c.id
       WHERE a.user_id = ?
       ORDER BY a.applied_at DESC`,
      [req.user.id]
    );
    res.json({ applications });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

router.get('/company', authenticate, requireAdmin, requireCompany, async (req, res) => {
  try {
    const pool = getPool();
    const { status, search } = req.query;
    
    if (!req.user.company_id) {
      return res.status(400).json({ error: 'Company not assigned to user', userId: req.user.id, userRole: req.user.role });
    }
    
    let query = `
      SELECT a.*, u.name as applicant_name, u.email as applicant_email, u.phone as applicant_phone,
             j.title as job_title, j.location as job_location, c.name as company_name
      FROM applications a
      JOIN users u ON a.user_id = u.id
      JOIN jobs j ON a.job_id = j.id
      LEFT JOIN companies c ON a.company_id = c.id
      WHERE a.company_id = ?
    `;
    const params = [req.user.company_id];
    
    if (status) {
      query += ' AND a.status = ?';
      params.push(status);
    }
    
    if (search) {
      query += ' AND (u.name LIKE ? OR u.email LIKE ? OR j.title LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY a.applied_at DESC';
    
    const [applications] = await pool.query(query, params);
    res.json({ applications: applications || [], company_id: req.user.company_id });
  } catch (error) {
    console.error('Get company applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications', details: error.message });
  }
});

router.put('/:id/status', authenticate, requireAdmin, requireCompany, async (req, res) => {
  try {
    const pool = getPool();
    const { status, notes, interview_date } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const validStatuses = ['Application Sent', 'Under Review', 'Interview Scheduled', 'Accepted', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }
    
    const [applications] = await pool.query(
      'SELECT company_id FROM applications WHERE id = ?',
      [req.params.id]
    );
    
    if (applications.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    if (applications[0].company_id !== req.user.company_id) {
      return res.status(403).json({ error: 'Access denied. This application does not belong to your company.' });
    }
    
    await pool.query(
      `UPDATE applications 
       SET status = ?, notes = ?, interview_date = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, notes || null, interview_date || null, req.params.id]
    );
    
    const [updated] = await pool.query(
      `SELECT a.*, u.name as applicant_name, u.email as applicant_email, u.phone as applicant_phone,
              j.title as job_title, j.location as job_location, c.name as company_name
       FROM applications a
       JOIN users u ON a.user_id = u.id
       JOIN jobs j ON a.job_id = j.id
       LEFT JOIN companies c ON a.company_id = c.id
       WHERE a.id = ?`,
      [req.params.id]
    );
    
    res.json({ application: updated[0], message: 'Application status updated successfully' });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: 'Failed to update application', details: error.message });
  }
});

export default router;
