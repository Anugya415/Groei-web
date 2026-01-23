import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendOTP, sendPasswordResetEmail, sendInterviewEmail, verifyEmailConfig } from '../src/services/email.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('--- Environment Check ---');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '********' : 'undefined');

const testEmail = async () => {
    console.log('--- Email Configuration Test ---');
    const isConfigured = await verifyEmailConfig();

    if (!isConfigured) {
        console.error('❌ Email configuration is invalid. Please check your .env file.');
        process.exit(1);
    }

    const recipient = process.env.SMTP_USER || process.env.EMAIL_USER;
    console.log(`Sending test emails to: ${recipient}`);

    try {
        // Test OTP
        console.log('\n1. Testing OTP Email...');
        const otpResult = await sendOTP(recipient, 'Test User', '123456');
        console.log('OTP Result:', otpResult);

        // Test Password Reset
        console.log('\n2. Testing Password Reset Email...');
        const resetResult = await sendPasswordResetEmail(recipient, 'Test User', 'test-reset-token');
        console.log('Reset Result:', resetResult);

        // Test Interview
        console.log('\n3. Testing Interview Email...');
        const interviewResult = await sendInterviewEmail(recipient, 'Test User', {
            jobTitle: 'Software Engineer',
            companyName: 'Groei Tech',
            date: new Date().toLocaleString(),
            type: 'Video Call',
            location: 'Google Meet',
            notes: 'Please be on time.'
        });
        console.log('Interview Result:', interviewResult);

        console.log('\n--- Test Completed ---');
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
};

testEmail();
