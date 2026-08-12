import { buildRecommendations } from "../../ai/recommendation/matchingAlgorithm";
import { enhanceRecommendations, generateAdvisorReply } from "../../ai/aiService";
import { Recommendation, StudentProfile, ChatMessage } from "../../src/types";
import { getUniversityData } from "../database/dataStore";

export async function generateRecommendationsForStudent(profile: StudentProfile): Promise<Recommendation[]> {
  const { programs, universities } = getUniversityData();
  const recommendations = buildRecommendations(profile, programs, universities);
  await enhanceRecommendations(profile, recommendations);
  return recommendations;
}

export async function generateChatReply(
  message: string,
  history: ChatMessage[] = [],
  studentProfile?: StudentProfile | null
): Promise<string> {
  return generateAdvisorReply(message, history, studentProfile);
}
