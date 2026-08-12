import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Recommendation, StudentProfile } from "../src/types";
import { SAMPLE_DEADLINES, SAMPLE_PROGRAMS, SAMPLE_SCHOLARSHIPS, SAMPLE_UNIVERSITIES } from "../src/data";
import { buildChatAdvisorSystemInstruction, buildRecommendationEnhancementPrompt } from "./chatbot/prompts";

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export async function enhanceRecommendations(
  profile: StudentProfile,
  recommendations: Recommendation[]
): Promise<void> {
  const ai = getGeminiClient();
  if (!ai) {
    return;
  }

  const topRecs = recommendations.slice(0, 3);
  if (!topRecs.length) {
    return;
  }

  try {
    const prompt = buildRecommendationEnhancementPrompt(profile, topRecs);
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (aiResponse.text) {
      const parsed = JSON.parse(aiResponse.text.trim());
      if (Array.isArray(parsed)) {
        parsed.forEach((explanationStr, index) => {
          if (topRecs[index] && typeof explanationStr === "string") {
            topRecs[index].aiExplanation = explanationStr;
          }
        });
      }
    }
  } catch (aiErr) {
    console.warn("Gemini AI enhancement failed, falling back to rule engine explanations:", aiErr);
  }
}

export async function generateAdvisorReply(
  message: string,
  history: ChatMessage[] = [],
  studentProfile?: StudentProfile | null
): Promise<string> {
  const ai = getGeminiClient();
  if (!ai) {
    return `Based on available verified Myanmar university dataset: For Computer Science, top options include UIT Yangon and UCSY/UCSM requiring strong Mathematics (≥ 75-80). For Medicine, UM1 Yangon requires high Biology (≥ 85) and high total marks (≥ 530). Check out our Explore & Dashboard tabs for detailed score matching!`;
  }

  const systemInstruction = buildChatAdvisorSystemInstruction(studentProfile);
  const contents = [] as Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>;

  if (Array.isArray(history)) {
    for (const msg of history.slice(-6)) {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    }
  }

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  return response.text || "I'm sorry, I couldn't process your request right now.";
}

export const AI_DATASET_CONTEXT = {
  universities: SAMPLE_UNIVERSITIES,
  programs: SAMPLE_PROGRAMS,
  scholarships: SAMPLE_SCHOLARSHIPS,
  deadlines: SAMPLE_DEADLINES,
};
