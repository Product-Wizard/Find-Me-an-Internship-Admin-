import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getApiKey = () => {
  if (import.meta?.env?.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  console.warn("Gemini API Key not found in process.env.API_KEY");
  return '';
};

// Lazy initialization of the AI client
const getAiClient = () => {
  if (!aiClient) {
    const apiKey = getApiKey();
    // Initialize even if key is empty, to allow the error to bubble up from the SDK when used
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const streamCareerAdvice = async (
  userMessage: string,
  history: { role: string; parts: { text: string }[] }[]
) => {
  try {
    const ai = getAiClient();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are an empathetic and professional Career Coach for 'Find Me an Internship'. Your goal is to help students with resume tips, interview prep, and career path advice. Keep answers concise, encouraging, and actionable. Limit responses to 150 words.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });
    const result = await chat.sendMessageStream({ message: userMessage });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};