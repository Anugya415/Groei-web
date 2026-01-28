import { validationResult } from 'express-validator';
import { sendContactEmail } from '../services/email.service.js';

export const submitContactForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, subject, message } = req.body;

        const result = await sendContactEmail({
            name,
            email,
            subject,
            message
        });

        if (!result.success) {
            throw new Error(result.error);
        }

        res.status(200).json({
            message: 'Message sent successfully',
            messageId: result.messageId
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            error: 'Failed to send message. Please try again later.'
        });
    }
};
