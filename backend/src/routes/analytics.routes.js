import express from 'express';
import { getPool } from '../config/database.js';
import { authenticate, requireAdmin, requireCompany } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);
router.use(requireAdmin);
router.use(requireCompany);

router.get('/company', async (req, res) => {
  try {
    const pool = getPool();
    const companyId = req.user.company_id;
    const { start_date, end_date } = req.query;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company association required' });
    }
    
    let query = `
      SELECT 
        DATE(a.applied_at) as date,
        COUNT(*) as total_applications,
        COUNT(CASE WHEN a.status = 'Interview Scheduled' THEN 1 END) as interviews_scheduled,
        COUNT(CASE WHEN a.status = 'Accepted' THEN 1 END) as accepted,
        COUNT(CASE WHEN a.status = 'Rejected' THEN 1 END) as rejected
      FROM applications a
      WHERE a.company_id = ?
    `;
    const params = [companyId];
    
    if (start_date && end_date) {
      query += ' AND DATE(a.applied_at) BETWEEN ? AND ?';
      params.push(start_date, end_date);
    } else {
      query += ' AND DATE(a.applied_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
    }
    
    query += ' GROUP BY DATE(a.applied_at) ORDER BY date DESC';
    
    const [analytics] = await pool.query(query, params);
    
    const [statusDistribution] = await pool.query(
      `SELECT status, COUNT(*) as count
       FROM applications
       WHERE company_id = ?
       GROUP BY status`,
      [companyId]
    );
    
    const [totalStats] = await pool.query(
      `SELECT 
        COUNT(*) as total_applications,
        COUNT(CASE WHEN status = 'Accepted' THEN 1 END) as accepted,
        COUNT(CASE WHEN status = 'Rejected' THEN 1 END) as rejected,
        COUNT(CASE WHEN status = 'Under Review' THEN 1 END) as under_review,
        COUNT(CASE WHEN status = 'Interview Scheduled' THEN 1 END) as interviews_scheduled
       FROM applications
       WHERE company_id = ?`,
      [companyId]
    );
    
    res.json({
      daily_analytics: analytics || [],
      status_distribution: statusDistribution || [],
      total_stats: totalStats[0] || {},
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics', details: error.message });
  }
});

export default router;
