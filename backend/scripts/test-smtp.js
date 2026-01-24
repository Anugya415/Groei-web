import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const user = process.env.SMTP_USER || process.env.EMAIL_USER;
const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD;

console.log('Testing SMTP Configuration...');
console.log(`User: ${user}`);
console.log(`Pass (raw): '${pass}'`); // Quotes to see spaces

async function testAuth(cleanPass) {
    const config = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: user,
            pass: cleanPass,
        },
        debug: true,
    };

    const transporter = nodemailer.createTransport(config);

    try {
        console.log(`\nTesting with password: '${cleanPass}'...`);
        await transporter.verify();
        console.log('✅ SUCCESS: SMTP connection verified!');
        return true;
    } catch (error) {
        console.error('❌ FAILED:', error.message);
        if (error.response) console.error('Response:', error.response);
        return false;
    }
}

async function run() {
    if (!user || !pass) {
        console.error('Missing credentials in .env');
        return;
    }

    // Test 1: As is
    const success1 = await testAuth(pass);

    // Test 2: Without spaces
    if (!success1 && pass.includes(' ')) {
        const cleanPass = pass.replace(/\s/g, '');
        console.log('\n--- Retrying with spaces removed ---');
        await testAuth(cleanPass);
    }
}

run();
