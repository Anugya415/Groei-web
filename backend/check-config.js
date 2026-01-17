import dotenv from 'dotenv';
dotenv.config();

console.log('Checking Email Config...');
console.log('SMTP_HOST:', process.env.SMTP_HOST ? 'Set' : 'Missing');
console.log('SMTP_PORT:', process.env.SMTP_PORT ? 'Set' : 'Missing');
console.log('SMTP_USER:', process.env.SMTP_USER ? 'Set' : 'Missing');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Missing');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'Set' : 'Missing');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set' : 'Missing');

if ((!process.env.SMTP_USER && !process.env.EMAIL_USER) || (!process.env.SMTP_PASS && !process.env.EMAIL_PASSWORD)) {
    console.log('❌ CRITICAL: Email credentials missing!');
} else {
    console.log('✅ Credentials appear to be set.');
}
