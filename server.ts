import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import {
  SAMPLE_UNIVERSITIES,
  SAMPLE_PROGRAMS,
  SAMPLE_SCHOLARSHIPS,
  SAMPLE_DEADLINES
} from "./src/data/universities";
import { calculateProgramMatch } from "./src/utils/calculator";
import { StudentProfile, Recommendation } from "./src/types";

// Initialize Gemini Client server-side lazily / safely
function getGeminiClient(): GoogleGenAI | null {
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", appName: "AI University Advisor for Myanmar Students" });
  });

  // Universities API
  app.get("/api/universities", (_req, res) => {
    res.json({ universities: SAMPLE_UNIVERSITIES });
  });

  // Programs API
  app.get("/api/programs", (req, res) => {
    const { location, field, search } = req.query;
    let list = [...SAMPLE_PROGRAMS];

    if (location && typeof location === "string" && location !== "All") {
      list = list.filter((p) => p.universityLocation.toLowerCase() === location.toLowerCase());
    }
    if (field && typeof field === "string" && field !== "All") {
      list = list.filter((p) => p.field.toLowerCase().includes(field.toLowerCase()));
    }
    if (search && typeof search === "string") {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.universityName.toLowerCase().includes(q) ||
          p.degree.toLowerCase().includes(q) ||
          p.field.toLowerCase().includes(q)
      );
    }

    res.json({ programs: list });
  });

  // Single Program Details API
  app.get("/api/programs/:id", (req, res) => {
    const program = SAMPLE_PROGRAMS.find((p) => p.id === req.params.id);
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }
    const university = SAMPLE_UNIVERSITIES.find((u) => u.id === program.universityId);
    const scholarships = SAMPLE_SCHOLARSHIPS.filter(
      (s) => s.universityId === program.universityId || !s.universityId
    );
    const deadlines = SAMPLE_DEADLINES.filter((d) => d.universityId === program.universityId);

    res.json({ program, university, scholarships, deadlines });
  });

  // Scholarships API
  app.get("/api/scholarships", (_req, res) => {
    res.json({ scholarships: SAMPLE_SCHOLARSHIPS });
  });

  // Deadlines API
  app.get("/api/deadlines", (_req, res) => {
    res.json({ deadlines: SAMPLE_DEADLINES });
  });

  // Analyze Student Profile & Generate Personalized Recommendations
  app.post("/api/recommendations", async (req, res) => {
    try {
      const profile: StudentProfile = req.body.profile;
      if (!profile || !profile.totalMarks) {
        return res.status(400).json({ error: "Invalid student profile provided" });
      }

      // Calculate base recommendations using verified dataset & rule engine
      const recommendations: Recommendation[] = SAMPLE_PROGRAMS.map((program) => {
        const university = SAMPLE_UNIVERSITIES.find((u) => u.id === program.universityId) || SAMPLE_UNIVERSITIES[0];
        return calculateProgramMatch(profile, program, university);
      });

      // Sort by overall match score descending
      recommendations.sort((a, b) => b.matchScores.overallMatch - a.matchScores.overallMatch);

      // Enhance top 3 explanations with Gemini AI if API key is present
      const ai = getGeminiClient();
      if (ai) {
        try {
          const topRecs = recommendations.slice(0, 3);
          const prompt = `
You are an expert AI University & Career Advisor for students in Myanmar.
A student named "${profile.name}" completed the Matriculation Exam with:
- Total Marks: ${profile.totalMarks} / 600
- Subject Marks: Math (${profile.subjectMarks.mathematics ?? 'N/A'}), English (${profile.subjectMarks.english ?? 'N/A'}), Physics (${profile.subjectMarks.physics ?? 'N/A'}), Biology (${profile.subjectMarks.biology ?? 'N/A'}), Chemistry (${profile.subjectMarks.chemistry ?? 'N/A'})
- Interests: ${profile.interests.join(', ')}
- Career Goals: ${profile.careerGoals.join(', ')}
- Location Preference: ${profile.preferredLocation}
- Learning Preference: ${profile.learningPreference}

Here are 3 recommended programs:
${topRecs.map((r, i) => `${i + 1}. ${r.program.name} at ${r.university.name} (Overall Match: ${r.matchScores.overallMatch}%)`).join('\n')}

For each of the 3 programs, provide a concise 2-3 sentence personalized explanation of why this program is recommended for this student based on their academic strengths and goals. Do NOT mention financial tuition/budget.
Return JSON format as an array of strings: ["explanation for 1", "explanation for 2", "explanation for 3"]
`;

          const aiResponse = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json"
            }
          });

          if (aiResponse.text) {
            const parsed = JSON.parse(aiResponse.text.trim());
            if (Array.isArray(parsed)) {
              parsed.forEach((explanationStr, index) => {
                if (topRecs[index] && typeof explanationStr === 'string') {
                  topRecs[index].aiExplanation = explanationStr;
                }
              });
            }
          }
        } catch (aiErr) {
          console.warn("Gemini AI enhancement failed, falling back to rule engine explanations:", aiErr);
        }
      }

      res.json({ recommendations, studentProfile: profile });
    } catch (err: any) {
      console.error("Error generating recommendations:", err);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // AI University Advisor Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, studentProfile } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string required" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Smart fallback when Gemini API key is missing
        return res.json({
          reply: `Based on available verified Myanmar university dataset: For Computer Science, top options include UIT Yangon and UCSY/UCSM requiring strong Mathematics (≥ 75-80). For Medicine, UM1 Yangon requires high Biology (≥ 85) and high total marks (≥ 530). Check out our Explore & Dashboard tabs for detailed score matching!`
        });
      }

      const systemInstruction = `
You are the "AI University Advisor for Myanmar Students".
Your primary purpose is to help Myanmar students navigate university selection, matriculation result requirements, degree choices, career pathways, and scholarships.

CRITICAL ACCURACY & ADVISORY RULES:
1. NEVER guarantee university admission or fabricate admission requirements, deadlines, or official statistics.
2. Clearly distinguish verified dataset information from AI estimates.
3. If information is not available in the provided context or unknown, explicitly say: "I don't have enough verified information to answer that."
4. Do NOT mention tuition fees, budget, or financial affordability as part of program compatibility recommendations.
5. Provide encouraging, clear, and professional educational guidance tailored for high-school matriculation graduates in Myanmar.

AVAILABLE VERIFIED UNIVERSITY DATASET CONTEXT:
${JSON.stringify(SAMPLE_UNIVERSITIES, null, 2)}

AVAILABLE VERIFIED PROGRAM DATASET CONTEXT:
${JSON.stringify(SAMPLE_PROGRAMS, null, 2)}

AVAILABLE SCHOLARSHIPS:
${JSON.stringify(SAMPLE_SCHOLARSHIPS, null, 2)}

APPLICATION DEADLINES:
${JSON.stringify(SAMPLE_DEADLINES, null, 2)}

STUDENT PROFILE (IF AVAILABLE):
${studentProfile ? JSON.stringify(studentProfile, null, 2) : "No student profile submitted yet."}
`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const msg of history.slice(-6)) {
          contents.push({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || "I'm sorry, I couldn't process your request right now.";
      res.json({ reply });
    } catch (err: any) {
      console.error("Chat error:", err);
      res.status(500).json({
        reply: "I encountered an error connecting to the AI service. Please try asking again."
      });
    }
  });

  // Vite development middleware vs production static server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
