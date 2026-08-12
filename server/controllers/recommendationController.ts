import { Request, Response } from "express";
import { StudentProfile, Recommendation } from "../../src/types";
import { generateRecommendationsForStudent } from "../services/recommendationService";

export async function generateRecommendationsController(req: Request, res: Response) {
  try {
    const profile: StudentProfile = req.body.profile;
    if (!profile || !profile.totalMarks) {
      return res.status(400).json({ error: "Invalid student profile provided" });
    }

    const recommendations: Recommendation[] = await generateRecommendationsForStudent(profile);
    return res.json({ recommendations, studentProfile: profile });
  } catch (err: any) {
    console.error("Error generating recommendations:", err);
    return res.status(500).json({ error: "Failed to generate recommendations" });
  }
}

export async function generateChatController(req: Request, res: Response) {
  try {
    const { message, history, studentProfile } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message string required" });
    }

    const reply = await (await import("../services/recommendationService")).generateChatReply(
      message,
      history,
      studentProfile
    );

    return res.json({ reply });
  } catch (err: any) {
    console.error("Chat error:", err);
    return res.status(500).json({
      reply: "I encountered an error connecting to the AI service. Please try asking again.",
    });
  }
}
