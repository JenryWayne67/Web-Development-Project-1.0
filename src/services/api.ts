import { StudentProfile, Recommendation, University, Program, Scholarship, ApplicationDeadline, ChatMessage } from '../types';

export async function fetchUniversities(): Promise<University[]> {
  try {
    const res = await fetch('/api/universities');
    if (!res.ok) throw new Error('Failed to fetch universities');
    const data = await res.json();
    return data.universities;
  } catch (e) {
    console.warn('API error, using local fallback:', e);
    const { SAMPLE_UNIVERSITIES } = await import('../data/universities');
    return SAMPLE_UNIVERSITIES;
  }
}

export async function fetchPrograms(params?: { location?: string; field?: string; search?: string }): Promise<Program[]> {
  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const res = await fetch(`/api/programs?${query}`);
    if (!res.ok) throw new Error('Failed to fetch programs');
    const data = await res.json();
    return data.programs;
  } catch (e) {
    console.warn('API error, using local fallback:', e);
    const { SAMPLE_PROGRAMS } = await import('../data/universities');
    return SAMPLE_PROGRAMS;
  }
}

export async function fetchScholarships(): Promise<Scholarship[]> {
  try {
    const res = await fetch('/api/scholarships');
    if (!res.ok) throw new Error('Failed to fetch scholarships');
    const data = await res.json();
    return data.scholarships;
  } catch (e) {
    const { SAMPLE_SCHOLARSHIPS } = await import('../data/universities');
    return SAMPLE_SCHOLARSHIPS;
  }
}

export async function fetchDeadlines(): Promise<ApplicationDeadline[]> {
  try {
    const res = await fetch('/api/deadlines');
    if (!res.ok) throw new Error('Failed to fetch deadlines');
    const data = await res.json();
    return data.deadlines;
  } catch (e) {
    const { SAMPLE_DEADLINES } = await import('../data/universities');
    return SAMPLE_DEADLINES;
  }
}

export async function generateRecommendations(profile: StudentProfile): Promise<Recommendation[]> {
  try {
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile }),
    });
    if (!res.ok) throw new Error('Failed to generate recommendations');
    const data = await res.json();
    return data.recommendations;
  } catch (e) {
    console.warn('Recommendation API failed, running local calculator:', e);
    const { SAMPLE_PROGRAMS, SAMPLE_UNIVERSITIES } = await import('../data/universities');
    const { calculateProgramMatch } = await import('../utils/calculator');
    const list = SAMPLE_PROGRAMS.map((p) => {
      const u = SAMPLE_UNIVERSITIES.find((uni) => uni.id === p.universityId) || SAMPLE_UNIVERSITIES[0];
      return calculateProgramMatch(profile, p, u);
    });
    list.sort((a, b) => b.matchScores.overallMatch - a.matchScores.overallMatch);
    return list;
  }
}

export async function sendAdvisorChatMessage(
  message: string,
  history: ChatMessage[],
  studentProfile?: StudentProfile | null
): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, studentProfile }),
    });
    if (!res.ok) throw new Error('Failed to send chat message');
    const data = await res.json();
    return data.reply;
  } catch (e) {
    console.warn('Chat API error:', e);
    return "I'm having trouble connecting right now. Please check out the university and program recommendations in the dashboard!";
  }
}
