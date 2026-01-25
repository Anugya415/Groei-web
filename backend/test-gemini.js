import { ChatService } from './src/services/chat.service.js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars manually for this test script
const result = dotenv.config({ path: path.join(process.cwd(), '.env') });
if (result.error) {
    console.error('Error loading .env file:', result.error);
}

async function testChat() {
    console.log('Testing Chat Service...');
    console.log('API Key present:', !!process.env.GEMINI_API_KEY);
    if (process.env.GEMINI_API_KEY) {
        console.log('API Key length:', process.env.GEMINI_API_KEY.length);
        console.log('API Key starts with:', process.env.GEMINI_API_KEY.substring(0, 4));
    }

    try {
        const response = await ChatService.getChatResponse("Hello, are you working?");
        console.log('Response received:', response);
    } catch (error) {
        console.error('Test failed with error:', error);
        if (error.cause) console.error('Cause:', error.cause);
    }
}

testChat();
