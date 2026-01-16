import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/profile', (req, res) => {
  res.json({ user: req.user });
});

export default router;
