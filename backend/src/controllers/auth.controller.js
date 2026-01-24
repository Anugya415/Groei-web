import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getPool } from '../config/database.js';
import { generateVerificationToken, generateResetToken, hashToken } from '../utils/token.utils.js';
import { sendVerificationEmail, sendPasswordResetEmail, sendOTP } from '../services/email.service.js';

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, role = 'user', company } = req.body;
    const pool = getPool();

    // Check for verified OTP
    const [otpRecords] = await pool.query(
      'SELECT id, verified FROM otp_verifications WHERE email = ? AND verified = TRUE AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
      [email]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ error: 'Email not verified. Please verify your email first.' });
    }

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

    // Generate verification token (keep this for backward compatibility or double verification if needed, 
    // but we can set email_verified to TRUE since they validted OTP)
    const verificationToken = generateVerificationToken();
    const hashedVerificationToken = hashToken(verificationToken);
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24);

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, company_id, verification_token, verification_token_expires, email_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, companyId, hashedVerificationToken, verificationExpires, true]
    );

    // Clean up OTP record
    await pool.query('DELETE FROM otp_verifications WHERE email = ?', [email]);

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

    // Send welcome email instead of verification email
    // Or just skip email for now since they are verified

    res.status(201).json({
      message: 'User created successfully.',
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role,
        company_id: companyId,
        company_name: companies[0]?.name || null,
        email_verified: true,
      },
    });
  } catch (err) {
    const error = err || new Error('Unknown error occurred during signup');
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

export const sendOtpSignup = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const pool = getPool();

    // Check if user exists
    try {
      const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Email already registered. Please login.' });
      }
    } catch (dbErr) {
      console.error('[AUTH] Database error checking user:', dbErr);
      throw dbErr;
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store in DB
    try {
      await pool.query(
        'INSERT INTO otp_verifications (email, otp, expires_at) VALUES (?, ?, ?)',
        [email, otp, expiresAt]
      );
    } catch (dbErr) {
      console.error('[AUTH] Database error storing OTP:', dbErr);
      throw dbErr;
    }

    // Send Email
    try {
      console.log(`[AUTH] Attempting to send OTP email to ${email}`);
      const emailResult = await sendOTP(email, name || 'Future User', otp);

      if (!emailResult.success) {
        throw new Error(emailResult.error || 'Failed to send email');
      }

      res.json({ message: 'OTP sent successfully' });
    } catch (emailErr) {
      console.error("[AUTH] Email sending failed:", emailErr.message);

      // In development, if email fails, we still allow the user to proceed by returning the OTP
      // This prevents "Internal Server Error" blocking the flow when SMTP is not working
      if (process.env.NODE_ENV === 'development') {
        console.log(`[DEV] SIMULATED SUCCESS: OTP for ${email} is: ${otp}`);

        return res.status(200).json({
          message: 'OTP generated (Email failed, check console)',
          debug_otp: otp,
          warning: 'Email delivery failed. Use debug_otp or check server logs.'
        });
      }

      res.status(500).json({
        error: `Email sending failed: ${emailErr.message}`,
        debug_otp: process.env.NODE_ENV === 'development' ? otp : undefined
      });
    }

  } catch (error) {
    console.error('[AUTH] Send OTP Critical error:', error);
    res.status(500).json({
      error: 'An internal error occurred while processing your request.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const verifyOtpSignup = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const pool = getPool();

    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

    const [records] = await pool.query(
      'SELECT id, expires_at FROM otp_verifications WHERE email = ? AND otp = ? AND verified = FALSE ORDER BY created_at DESC LIMIT 1',
      [email, otp]
    );

    if (records.length === 0) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const record = records[0];
    if (new Date() > new Date(record.expires_at)) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Mark as verified
    await pool.query('UPDATE otp_verifications SET verified = TRUE WHERE id = ?', [record.id]);

    res.json({ message: 'OTP verified successfully' });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`[AUTH] Login attempt for email: ${email}`);
    const pool = getPool();

    const [users] = await pool.query(
      'SELECT id, name, email, password, role, company_id, status FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      console.log(`[AUTH] Login failed: User not found for ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    if (user.status !== 'active') {
      console.log(`[AUTH] Login failed: Account inactive for ${email}`);
      return res.status(401).json({ error: 'Account is inactive' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`[AUTH] Login failed: Invalid password for ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'hackforge-default-secret-change-in-production';

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    console.log(`[AUTH] Login successful for ${email}, role: ${user.role}`);

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
  } catch (err) {
    console.error('[AUTH] Login error:', err);
    if (err.code === 'ER_BAD_DB_ERROR') {
      return res.status(500).json({ error: 'Database not initialized. Please run: npm run init-db' });
    }
    res.status(500).json({ error: err.message || 'Failed to login' });
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
  } catch (err) {
    const error = err || new Error('Unknown error occurred');
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
  } catch (err) {
    const error = err || new Error('Unknown error occurred');
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const pool = getPool();

    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    const hashedToken = hashToken(token);

    const [users] = await pool.query(
      'SELECT id, email, verification_token_expires, email_verified FROM users WHERE verification_token = ?',
      [hashedToken]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    const user = users[0];

    if (user.email_verified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    // Check if token is expired
    const now = new Date();
    const expires = new Date(user.verification_token_expires);
    if (now > expires) {
      return res.status(400).json({ error: 'Verification token has expired. Please request a new one.' });
    }

    // Mark email as verified
    await pool.query(
      'UPDATE users SET email_verified = TRUE, verification_token = NULL, verification_token_expires = NULL WHERE id = ?',
      [user.id]
    );

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    const error = err || new Error('Unknown error occurred');
    console.error('Verify email error:', error);
    res.status(500).json({ error: 'Failed to verify email' });
  }
};

// Resend verification email
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const pool = getPool();

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const [users] = await pool.query(
      'SELECT id, name, email, email_verified FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    if (user.email_verified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const hashedVerificationToken = hashToken(verificationToken);
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24);

    // Update user with new token
    await pool.query(
      'UPDATE users SET verification_token = ?, verification_token_expires = ? WHERE id = ?',
      [hashedVerificationToken, verificationExpires, user.id]
    );

    // Send verification email
    try {
      const emailResult = await sendVerificationEmail(user.email, user.name, verificationToken);
      if (!emailResult.success) {
        throw new Error(emailResult.error || 'Failed to send verification email');
      }
      res.json({ message: 'Verification email sent successfully' });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      res.status(500).json({ error: emailError.message || 'Failed to send verification email' });
    }
  } catch (err) {
    const error = err || new Error('Unknown error occurred');
    console.error('Resend verification email error:', error);
    res.status(500).json({ error: 'Failed to resend verification email' });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const pool = getPool();

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const [users] = await pool.query(
      'SELECT id, name, email FROM users WHERE email = ? AND status = ?',
      [email, 'active']
    );

    // Don't reveal if email exists or not for security
    if (users.length > 0) {
      const user = users[0];

      // Generate reset token
      const resetToken = generateResetToken();
      const hashedResetToken = hashToken(resetToken);
      const resetExpires = new Date();
      resetExpires.setHours(resetExpires.getHours() + 1); // 1 hour

      // Update user with reset token
      await pool.query(
        'UPDATE users SET password_reset_token = ?, password_reset_expires = ? WHERE id = ?',
        [hashedResetToken, resetExpires, user.id]
      );

      // Send password reset email
      try {
        const emailResult = await sendPasswordResetEmail(user.email, user.name, resetToken);
        if (!emailResult.success) {
          throw new Error(emailResult.error || 'Failed to send password reset email');
        }
        console.log('✅ Password reset email sent to:', user.email);
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError);
        return res.status(500).json({ error: emailError.message || 'Failed to send password reset email' });
      }
    }

    // Always return success message (don't reveal if email exists)
    res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
  } catch (err) {
    const error = err || new Error('Unknown error occurred');
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const pool = getPool();

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const hashedToken = hashToken(token);

    const [users] = await pool.query(
      'SELECT id, password_reset_expires FROM users WHERE password_reset_token = ?',
      [hashedToken]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const user = users[0];

    // Check if token is expired
    const now = new Date();
    const expires = new Date(user.password_reset_expires);
    if (now > expires) {
      return res.status(400).json({ error: 'Reset token has expired. Please request a new one.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);

    // Update password and clear reset token
    await pool.query(
      'UPDATE users SET password = ?, password_reset_token = NULL, password_reset_expires = NULL WHERE id = ?',
      [hashedPassword, user.id]
    );

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    const error = err || new Error('Unknown error occurred');
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};
