import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Remove top-level initialization
let genAI = null;

export class ChatService {
    static async getChatResponse(message, history = []) {
        try {
            // Lazy initialization to ensure env vars are loaded
            if (!genAI && process.env.GEMINI_API_KEY) {
                genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            }

            if (!genAI) {
                throw new Error('Gemini API key is not configured.');
            }

            const systemPrompt = "You are Chilli, the AI assistant for GROEI (which stands for Growth). GROEI is an AI-powered job platform that connects world-class talent with exceptional opportunities. Your goal is to be helpful, professional, and encouraging. You specialize in resume parsing, job matching, and career advice. Keep your responses concise and focused on how GROEI's features (Resume Scanner, Smart Matching, Heatmap Analytics) can help the user.";

            const model = genAI.getGenerativeModel({
                model: 'gemini-2.5-flash',
                systemInstruction: systemPrompt,
            });

            // Format history for Gemini API
            let formattedHistory = history.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            }));

            // Gemini SDK requires the first message to be from the user
            // Remove any leading model messages
            while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
                formattedHistory.shift();
            }

            const chat = model.startChat({
                history: formattedHistory,
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7,
                }
            });

            const result = await chat.sendMessage(message);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Chat Service Error Detail:', error);
            throw new Error(`AI Chat error: ${error.message}`);
        }
    }
}
