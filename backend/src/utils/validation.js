import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateSignup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
  body('company').optional().trim(),
  handleValidationErrors,
];

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const validateJob = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('description').trim().notEmpty().withMessage('Job description is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('type').isIn(['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']).withMessage('Invalid job type'),
  handleValidationErrors,
];

export const validateApplication = [
  body('job_id').isInt().withMessage('Valid job ID is required'),
  body('cover_letter').optional().trim(),
  handleValidationErrors,
];
