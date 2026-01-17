import express from 'express';
import {
  signup,
  login,
  getProfile,
  updateProfile,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  sendOtpSignup,
  verifyOtpSignup
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateSignup, validateLogin } from '../utils/validation.js';

const router = express.Router();

// OTP Routes (Step 1 & 2 of Signup)
router.post('/send-otp', sendOtpSignup);
router.post('/verify-otp', verifyOtpSignup);

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

// Email verification
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

// Password reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
