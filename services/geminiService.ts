import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const streamCareerAdvice = async (
  userMessage: string, 
  history: { role: string; parts: { text: string }[] }[]
) => {
  try {
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