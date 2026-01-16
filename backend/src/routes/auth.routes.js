import express from 'express';
import { signup, login, getProfile, updateProfile } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateSignup, validateLogin } from '../utils/validation.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;
