import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

// Manual config
dotenv.config({ path: path.join(process.cwd(), '.env') });

const key = process.env.GEMINI_API_KEY;
console.log('Key:', key ? 'Found' : 'Missing');

if (!key) {
    console.error('API Key missing in .env');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

async function run() {
    try {
        console.log('Sending request to Gemini...');
        const result = await model.generateContent("Hello");
        console.log('Response:', result.response.text());
    } catch (e) {
        console.error('Error:', JSON.stringify(e, null, 2));
        console.error('Error message:', e.message);
    }
}
run();
