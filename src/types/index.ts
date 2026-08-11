export type Language = 'en' | 'my';

export interface SubjectMarks {
  mathematics?: number;
  english?: number;
  myanmar?: number;
  physics?: number;
  chemistry?: number;
  biology?: number;
  geography?: number;
  history?: number;
  economics?: number;
  otherSubjectName?: string;
  otherSubjectMark?: number;
}

export type MatriculationStream = 'science' | 'arts' | 'bio_science' | 'general';

export interface StudentProfile {
  id?: string;
  name: string;
  matriculationYear: number;
  totalMarks: number;
  stream?: MatriculationStream;
  subjectMarks: SubjectMarks;
  interests: string[];
  careerGoals: string[];
  preferredLocation: string; // e.g. "Yangon", "Mandalay", "Naypyidaw", "Taunggyi", "Mawlamyine", "Any"
  learningPreference: 'practical' | 'theory' | 'balanced' | 'not_sure';
  universityTypePreference: 'public' | 'private' | 'international' | 'no_preference';
}

export interface MatchScores {
  overallMatch: number; // 0-100 percentage
  academicMatch: number; // 0-100 percentage
  interestMatch: number; // 0-100 percentage
  careerMatch: number; // 0-100 percentage
  locationMatch: number; // 0-100 percentage
  learningMatch: number; // 0-100 percentage
}

export type EligibilityStatus = 'eligible' | 'possibly_eligible' | 'not_eligible';

export interface RequirementDetail {
  requirementName: string;
  minVal?: number;
  studentVal?: number;
  met: boolean | 'uncertain';
  note?: string;
}

export interface University {
  id: string;
  name: string;
  myanmarName?: string;
  code: string;
  location: string;
  type: 'public' | 'private' | 'international';
  description: string;
  website: string;
  establishedYear?: number;
  campusEnvironment?: string;
  isDemoData: boolean;
  logoUrl?: string;
  imageUrl?: string;
}

export interface Program {
  id: string;
  universityId: string;
  universityName: string;
  universityLocation: string;
  universityType: 'public' | 'private' | 'international';
  name: string;
  myanmarName?: string;
  degree: string;
  field: string;
  durationYears: number;
  learningStyle: 'practical' | 'theory' | 'balanced';
  minTotalMarks: number;
  requiredSubjects: {
    subject: keyof SubjectMarks;
    minMark?: number;
  }[];
  admissionRequirementsSummary: string;
  applicationProcess: string;
  officialLink: string;
  estimatedCompetitiveness: 'Very High' | 'High' | 'Moderate' | 'Flexible' | 'Insufficient Data';
  competitivenessNote: string;
  isDemoData: boolean;
}

export interface Recommendation {
  id: string;
  program: Program;
  university: University;
  matchScores: MatchScores;
  eligibilityStatus: EligibilityStatus;
  eligibilityDetails: RequirementDetail[];
  aiExplanation: string;
  careerPathway: CareerPathway;
  availableScholarships: Scholarship[];
}

export interface CareerPathway {
  degreeName: string;
  specializations: string[];
  potentialCareers: string[];
  recommendedSkills: string[];
  relevanceExplanation: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  universityId?: string;
  universityName?: string;
  eligibilityCriteria: string;
  academicRequirements: string;
  minTotalMarks?: number;
  applicationDeadline: string;
  description: string;
  officialLink: string;
  isDemoData: boolean;
}

export interface ApplicationDeadline {
  id: string;
  universityId: string;
  universityName: string;
  programId?: string;
  programName: string;
  openingDate: string;
  closingDate: string;
  status: 'upcoming' | 'open' | 'closing_soon' | 'closed';
  note?: string;
  isDemoData: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}
