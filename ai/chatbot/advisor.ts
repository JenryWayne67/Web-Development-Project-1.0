import { ChatMessage, StudentProfile } from "../../src/types";
import { generateAdvisorReply } from "../aiService";

export async function getAdvisorResponse(
  message: string,
  history: ChatMessage[] = [],
  studentProfile?: StudentProfile | null
): Promise<string> {
  return generateAdvisorReply(message, history, studentProfile);
}
