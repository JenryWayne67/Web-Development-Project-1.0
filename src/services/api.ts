import { StudentProfile, Recommendation, University, Program, Scholarship, ApplicationDeadline, ChatMessage } from '../types';
import { SAMPLE_UNIVERSITIES, SAMPLE_PROGRAMS, SAMPLE_SCHOLARSHIPS, SAMPLE_DEADLINES } from '../data';

export async function fetchUniversities(): Promise<University[]> {
  const res = await fetch('/api/universities');
  if (!res.ok) throw new Error('Failed to fetch universities');
  const data = await res.json();
  return data.universities;
}

export async function fetchPrograms(params?: { location?: string; field?: string; search?: string }): Promise<Program[]> {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`/api/programs?${query}`);
  if (!res.ok) throw new Error('Failed to fetch programs');
  const data = await res.json();
  return data.programs;
}

export async function fetchScholarships(): Promise<Scholarship[]> {
  const res = await fetch('/api/scholarships');
  if (!res.ok) throw new Error('Failed to fetch scholarships');
  const data = await res.json();
  return data.scholarships;
}

export async function fetchDeadlines(): Promise<ApplicationDeadline[]> {
  const res = await fetch('/api/deadlines');
  if (!res.ok) throw new Error('Failed to fetch deadlines');
  const data = await res.json();
  return data.deadlines;
}

export async function generateRecommendations(profile: StudentProfile): Promise<Recommendation[]> {
  const res = await fetch('/api/recommendations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile }),
  });
  if (!res.ok) throw new Error('Failed to generate recommendations');
  const data = await res.json();
  return data.recommendations;
}

export async function sendAdvisorChatMessage(
  message: string,
  history: ChatMessage[],
  studentProfile?: StudentProfile | null
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, studentProfile }),
  });
  if (!res.ok) throw new Error('Failed to send chat message');
  const data = await res.json();
  return data.reply;
}

export { SAMPLE_UNIVERSITIES, SAMPLE_PROGRAMS, SAMPLE_SCHOLARSHIPS, SAMPLE_DEADLINES };
