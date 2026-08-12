import { Program, Recommendation, StudentProfile, University } from "../../src/types";
import { calculateProgramMatch } from "./scoring";

export function buildRecommendations(
  profile: StudentProfile,
  programs: Program[],
  universities: University[]
): Recommendation[] {
  const recommendations = programs.map((program) => {
    const university = universities.find((u) => u.id === program.universityId) || universities[0];
    return calculateProgramMatch(profile, program, university);
  });

  recommendations.sort((a, b) => b.matchScores.overallMatch - a.matchScores.overallMatch);
  return recommendations;
}
