import express from 'express';
import { getPool } from '../config/database.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get applicant's interviews
router.get('/my', authenticate, async (req, res) => {
    try {
        const pool = getPool();
        const [interviews] = await pool.query(
            `SELECT i.*, j.title as job_title, c.name as company_name, c.logo as company_logo
       FROM interviews i
       JOIN applications a ON i.application_id = a.id
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON a.company_id = c.id
       WHERE a.user_id = ?
       ORDER BY i.scheduled_at DESC`,
            [req.user.id]
        );

        res.json({ interviews });
    } catch (error) {
        console.error('Get my interviews error:', error);
        res.status(500).json({ error: 'Failed to fetch interviews' });
    }
});

// Get interview by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const pool = getPool();
        const [interviews] = await pool.query(
            `SELECT i.*, j.title as job_title, c.name as company_name, c.logo as company_logo,
              u.name as applicant_name, u.email as applicant_email
       FROM interviews i
       JOIN applications a ON i.application_id = a.id
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON a.company_id = c.id
       JOIN users u ON a.user_id = u.id
       WHERE i.id = ? AND (a.user_id = ? OR a.company_id = ?)`,
            [req.params.id, req.user.id, req.user.company_id]
        );

        if (interviews.length === 0) {
            return res.status(404).json({ error: 'Interview not found or access denied' });
        }

        res.json({ interview: interviews[0] });
    } catch (error) {
        console.error('Get interview error:', error);
        res.status(500).json({ error: 'Failed to fetch interview details' });
    }
});

export default router;
