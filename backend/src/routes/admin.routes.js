import express from 'express';
import { getPool } from '../config/database.js';
import { authenticate, requireAdmin, requireCompany } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);
router.use(requireAdmin);
router.use(requireCompany);

router.get('/dashboard', async (req, res) => {
  try {
    const pool = getPool();
    const companyId = req.user.company_id;
    
    if (!companyId) {
      return res.status(400).json({ error: 'Company association required' });
    }
    
    const [stats] = await pool.query(
      `SELECT 
        COUNT(DISTINCT a.id) as total_applications,
        COUNT(DISTINCT CASE WHEN a.status = 'Interview Scheduled' THEN a.id END) as interviews_scheduled,
        COUNT(DISTINCT CASE WHEN a.status = 'Under Review' THEN a.id END) as under_review,
        COUNT(DISTINCT CASE WHEN a.status = 'Accepted' THEN a.id END) as accepted,
        COUNT(DISTINCT CASE WHEN a.status = 'Rejected' THEN a.id END) as rejected,
        COUNT(DISTINCT CASE WHEN a.status IN ('Under Review', 'Application Sent') THEN a.id END) as pending
       FROM applications a
       WHERE a.company_id = ?`,
      [companyId]
    );
    
    const [recentApplications] = await pool.query(
      `SELECT a.*, u.name as applicant_name, u.email as applicant_email, j.title as job_title, c.name as company_name
       FROM applications a
       JOIN users u ON a.user_id = u.id
       JOIN jobs j ON a.job_id = j.id
       LEFT JOIN companies c ON a.company_id = c.id
       WHERE a.company_id = ?
       ORDER BY a.applied_at DESC
       LIMIT 5`,
      [companyId]
    );
    
    const [jobStats] = await pool.query(
      `SELECT 
        COUNT(*) as total_jobs,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_jobs,
        COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed_jobs
       FROM jobs
       WHERE company_id = ?`,
      [companyId]
    );
    
    res.json({
      stats: {
        ...stats[0],
        ...jobStats[0],
      },
      recent_applications: recentApplications || [],
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data', details: error.message });
  }
});

router.get('/settings', async (req, res) => {
  try {
    const pool = getPool();
    const [settings] = await pool.query(
      'SELECT * FROM admin_settings WHERE user_id = ?',
      [req.user.id]
    );
    
    if (settings.length === 0) {
      await pool.query(
        'INSERT INTO admin_settings (user_id) VALUES (?)',
        [req.user.id]
      );
      const [newSettings] = await pool.query(
        'SELECT * FROM admin_settings WHERE user_id = ?',
        [req.user.id]
      );
      return res.json({ settings: newSettings[0] });
    }
    
    res.json({ settings: settings[0] });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const pool = getPool();
    const { email_notifications, application_alerts, weekly_reports, system_updates, sms_notifications } = req.body;
    
    const updateFields = [];
    const updateValues = [];
    
    if (email_notifications !== undefined) { 
      updateFields.push('email_notifications = ?'); 
      updateValues.push(email_notifications ? 1 : 0); 
    }
    if (application_alerts !== undefined) { 
      updateFields.push('application_alerts = ?'); 
      updateValues.push(application_alerts ? 1 : 0); 
    }
    if (weekly_reports !== undefined) { 
      updateFields.push('weekly_reports = ?'); 
      updateValues.push(weekly_reports ? 1 : 0); 
    }
    if (system_updates !== undefined) { 
      updateFields.push('system_updates = ?'); 
      updateValues.push(system_updates ? 1 : 0); 
    }
    if (sms_notifications !== undefined) { 
      updateFields.push('sms_notifications = ?'); 
      updateValues.push(sms_notifications ? 1 : 0); 
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(req.user.id);
    
    await pool.query(
      `UPDATE admin_settings SET ${updateFields.join(', ')} WHERE user_id = ?`,
      updateValues
    );
    
    const [settings] = await pool.query(
      'SELECT * FROM admin_settings WHERE user_id = ?',
      [req.user.id]
    );
    
    if (settings.length === 0) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    
    res.json({ settings: settings[0], message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings', details: error.message });
  }
});

export default router;
