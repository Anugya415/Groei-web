import express from 'express';
import { getPool } from '../config/database.js';
import { authenticate, requireAdmin, requireCompany } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [companies] = await pool.query(
      'SELECT * FROM companies ORDER BY name ASC'
    );
    res.json({ companies });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pool = getPool();
    const [companies] = await pool.query(
      'SELECT * FROM companies WHERE id = ?',
      [req.params.id]
    );
    
    if (companies.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json({ company: companies[0] });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

router.get('/my/company', authenticate, requireCompany, async (req, res) => {
  try {
    const pool = getPool();
    const [companies] = await pool.query(
      'SELECT * FROM companies WHERE id = ?',
      [req.user.company_id]
    );
    
    if (companies.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json({ company: companies[0] });
  } catch (error) {
    console.error('Get my company error:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

router.put('/my/company', authenticate, requireAdmin, requireCompany, async (req, res) => {
  try {
    const pool = getPool();
    const { industry, location, size, employees, description, website, phone, email } = req.body;
    
    const updateFields = [];
    const updateValues = [];
    
    if (industry !== undefined) { updateFields.push('industry = ?'); updateValues.push(industry); }
    if (location !== undefined) { updateFields.push('location = ?'); updateValues.push(location); }
    if (size !== undefined) { updateFields.push('size = ?'); updateValues.push(size); }
    if (employees !== undefined) { updateFields.push('employees = ?'); updateValues.push(employees); }
    if (description !== undefined) { updateFields.push('description = ?'); updateValues.push(description); }
    if (website !== undefined) { updateFields.push('website = ?'); updateValues.push(website); }
    if (phone !== undefined) { updateFields.push('phone = ?'); updateValues.push(phone); }
    if (email !== undefined) { updateFields.push('email = ?'); updateValues.push(email); }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(req.user.company_id);
    
    await pool.query(
      `UPDATE companies SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    const [companies] = await pool.query(
      'SELECT * FROM companies WHERE id = ?',
      [req.user.company_id]
    );
    
    if (companies.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json({ company: companies[0], message: 'Company updated successfully' });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ error: 'Failed to update company', details: error.message });
  }
});

export default router;
