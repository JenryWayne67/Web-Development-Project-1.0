import {
  StudentProfile,
  SubjectMarks,
  Program,
  University,
  MatchScores,
  EligibilityStatus,
  RequirementDetail,
  Recommendation,
  CareerPathway,
  Scholarship
} from '../types';
import { SAMPLE_SCHOLARSHIPS } from '../data/universities';

export function calculateProgramMatch(
  profile: StudentProfile,
  program: Program,
  university: University
): Recommendation {
  // 1. ACADEMIC FIT & ELIGIBILITY
  const eligibilityDetails: RequirementDetail[] = [];
  let totalReqMet = true;
  let totalReqUncertain = false;

  // Check Total Marks
  const studentTotal = profile.totalMarks || 0;
  const minTotal = program.minTotalMarks || 0;

  if (studentTotal >= minTotal) {
    eligibilityDetails.push({
      requirementName: 'Total Matriculation Marks',
      minVal: minTotal,
      studentVal: studentTotal,
      met: true,
      note: `Student achieved ${studentTotal} marks (Required: ≥ ${minTotal})`
    });
  } else {
    totalReqMet = false;
    eligibilityDetails.push({
      requirementName: 'Total Matriculation Marks',
      minVal: minTotal,
      studentVal: studentTotal,
      met: false,
      note: `Student achieved ${studentTotal} marks, which is below the requirement of ${minTotal}`
    });
  }

  // Check Required Subject Marks
  let subjectScoreSum = 0;
  let requiredSubjectCount = program.requiredSubjects.length;

  for (const reqSub of program.requiredSubjects) {
    const rawMark = profile.subjectMarks[reqSub.subject as keyof SubjectMarks];
    const studentMark = typeof rawMark === 'number' ? rawMark : undefined;
    const minMark = reqSub.minMark || 50;

    if (studentMark === undefined || Number.isNaN(studentMark)) {
      totalReqUncertain = true;
      eligibilityDetails.push({
        requirementName: `Required Subject: ${reqSub.subject.toUpperCase()}`,
        minVal: minMark,
        studentVal: undefined,
        met: 'uncertain',
        note: `Mark for ${reqSub.subject} not specified`
      });
    } else if (studentMark >= minMark) {
      const margin = studentMark - minMark;
      subjectScoreSum += Math.min(100, 75 + margin * 1.5);
      eligibilityDetails.push({
        requirementName: `Required Subject: ${reqSub.subject.toUpperCase()}`,
        minVal: minMark,
        studentVal: studentMark,
        met: true,
        note: `${reqSub.subject.toUpperCase()} mark ${studentMark} satisfies minimum ${minMark}`
      });
    } else {
      totalReqMet = false;
      eligibilityDetails.push({
        requirementName: `Required Subject: ${reqSub.subject.toUpperCase()}`,
        minVal: minMark,
        studentVal: studentMark,
        met: false,
        note: `${reqSub.subject.toUpperCase()} mark ${studentMark} is below required ${minMark}`
      });
    }
  }

  // Compute Academic Match Score (0 - 100)
  let academicMatch = 0;
  if (minTotal > 0) {
    const totalRatio = studentTotal / minTotal;
    const baseTotalScore = Math.min(100, totalRatio * 85);
    const avgSubScore = requiredSubjectCount > 0 ? (subjectScoreSum / requiredSubjectCount) : 80;
    academicMatch = Math.round((baseTotalScore * 0.6) + (avgSubScore * 0.4));
  } else {
    academicMatch = 80;
  }
  academicMatch = Math.min(99, Math.max(30, academicMatch));

  // Determine Eligibility Status
  let eligibilityStatus: EligibilityStatus = 'eligible';
  if (!totalReqMet) {
    eligibilityStatus = 'not_eligible';
  } else if (totalReqUncertain) {
    eligibilityStatus = 'possibly_eligible';
  }

  // 2. INTEREST FIT (0 - 100)
  let interestMatch = 60; // Baseline
  const studentInterests = profile.interests || [];
  const programField = program.field.toLowerCase();
  const programName = program.name.toLowerCase();

  let interestHits = 0;
  for (const interest of studentInterests) {
    const lowerInt = interest.toLowerCase();
    if (programField.includes(lowerInt) || programName.includes(lowerInt) || lowerInt.includes(programField)) {
      interestHits += 2;
    } else if (
      (lowerInt.includes('computer') && programField.includes('computer')) ||
      (lowerInt.includes('ai') && (programName.includes('ai') || programName.includes('artificial intelligence'))) ||
      (lowerInt.includes('engineering') && programField.includes('engineering')) ||
      (lowerInt.includes('medicine') && programField.includes('medicine')) ||
      (lowerInt.includes('business') && (programField.includes('business') || programField.includes('economics'))) ||
      (lowerInt.includes('law') && programField.includes('law'))
    ) {
      interestHits += 2;
    }
  }

  if (studentInterests.length > 0) {
    interestMatch = Math.min(98, 65 + (interestHits / studentInterests.length) * 35);
  }

  // 3. CAREER FIT (0 - 100)
  let careerMatch = 65;
  const studentCareers = profile.careerGoals || [];
  const isUndecided = studentCareers.includes('Undecided') || studentCareers.includes("I'm not sure yet");

  if (isUndecided) {
    careerMatch = 80; // General fit for undecided students
  } else if (studentCareers.length > 0) {
    let careerHits = 0;
    for (const career of studentCareers) {
      const c = career.toLowerCase();
      if (
        (c.includes('software') || c.includes('ai') || c.includes('developer') || c.includes('data')) && programField.includes('computer')
      ) {
        careerHits += 1;
      } else if (c.includes('engineer') && programField.includes('engineering')) {
        careerHits += 1;
      } else if ((c.includes('doctor') || c.includes('health')) && programField.includes('medicine')) {
        careerHits += 1;
      } else if ((c.includes('manager') || c.includes('entrepreneur') || c.includes('accountant')) && (programField.includes('business') || programField.includes('economics'))) {
        careerHits += 1;
      } else if (c.includes('lawyer') && programField.includes('law')) {
        careerHits += 1;
      } else if (c.includes('scientist') && (programField.includes('science') || programField.includes('agriculture'))) {
        careerHits += 1;
      }
    }
    careerMatch = Math.min(98, 70 + (careerHits / Math.max(1, studentCareers.length)) * 28);
  }

  // 4. LOCATION FIT (0 - 100)
  let locationMatch = 75;
  const prefLoc = profile.preferredLocation;
  if (!prefLoc || prefLoc === 'No preference' || prefLoc === 'Any' || prefLoc === 'Other') {
    locationMatch = 90;
  } else if (university.location.toLowerCase() === prefLoc.toLowerCase()) {
    locationMatch = 98;
  } else {
    locationMatch = 60; // Different city
  }

  // 5. LEARNING PREFERENCE FIT (0 - 100)
  let learningMatch = 80;
  if (profile.learningPreference === 'not_sure') {
    learningMatch = 85;
  } else if (profile.learningPreference === program.learningStyle) {
    learningMatch = 95;
  } else if (profile.learningPreference === 'balanced' || program.learningStyle === 'balanced') {
    learningMatch = 88;
  } else {
    learningMatch = 70;
  }

  // OVERALL MATCH PERCENTAGE
  // Weighted combination
  const overallMatch = Math.round(
    academicMatch * 0.35 +
    interestMatch * 0.25 +
    careerMatch * 0.25 +
    locationMatch * 0.10 +
    learningMatch * 0.05
  );

  const matchScores: MatchScores = {
    overallMatch: Math.min(99, Math.max(40, overallMatch)),
    academicMatch,
    interestMatch: Math.round(interestMatch),
    careerMatch: Math.round(careerMatch),
    locationMatch,
    learningMatch
  };

  // Generate Career Pathway object
  const careerPathway = generateCareerPathwayForProgram(program, profile);

  // Available Scholarships for this program/student
  const availableScholarships = SAMPLE_SCHOLARSHIPS.filter(
    (s) => s.universityId === program.universityId || !s.universityId
  );

  // Fallback initial AI explanation string
  const aiExplanation = generateRuleExplanation(profile, program, university, matchScores, eligibilityStatus);

  return {
    id: `${program.id}-${Date.now()}`,
    program,
    university,
    matchScores,
    eligibilityStatus,
    eligibilityDetails,
    aiExplanation,
    careerPathway,
    availableScholarships
  };
}

function generateCareerPathwayForProgram(program: Program, profile: StudentProfile): CareerPathway {
  const field = program.field;
  if (field === 'Computer Science' || field === 'Artificial Intelligence') {
    return {
      degreeName: program.name,
      specializations: ['Artificial Intelligence & Machine Learning', 'Full-Stack Software Engineering', 'Cybersecurity', 'Cloud & Data Engineering'],
      potentialCareers: ['Software Engineer', 'AI Specialist', 'Data Scientist', 'Solutions Architect', 'Cybersecurity Analyst'],
      recommendedSkills: ['Python & JavaScript/TypeScript', 'Data Structures & Algorithms', 'Relational & NoSQL Databases', 'System Architecture', 'Problem Solving'],
      relevanceExplanation: `Given your score in Mathematics (${profile.subjectMarks.mathematics ?? 'N/A'}) and interests in tech, this degree equips you with foundational computational theory and industry software design skills.`
    };
  } else if (field === 'Engineering') {
    return {
      degreeName: program.name,
      specializations: ['Structural & Infrastructure Design', 'Automation & Robotics', 'Power & Energy Systems', 'Embedded Systems'],
      potentialCareers: ['Civil / Electrical / Mechanical Engineer', 'Project Manager', 'Industrial Automation Engineer', 'Technical Consultant'],
      recommendedSkills: ['Advanced Mathematics & Physics', 'CAD Software & Simulation', 'Project Management', 'Safety Standards', 'Technical Drawing'],
      relevanceExplanation: `This engineering pathway leverages your analytical physics and math foundation to design real-world physical and electronic systems.`
    };
  } else if (field === 'Medicine') {
    return {
      degreeName: program.name,
      specializations: ['General Medicine', 'Surgery', 'Pediatrics', 'Public Health & Epidemiology', 'Clinical Research'],
      potentialCareers: ['Medical Doctor (M.B., B.S.)', 'Surgeon', 'Public Health Officer', 'Clinical Researcher'],
      recommendedSkills: ['Human Anatomy & Physiology', 'Clinical Diagnostics', 'Patient Communication', 'Empathy & Crisis Resilience', 'Medical Ethics'],
      relevanceExplanation: `Matches your high Biology mark (${profile.subjectMarks.biology ?? 'N/A'}) and interest in medical sciences to prepare you for a lifetime of healthcare service.`
    };
  } else if (field === 'Business' || field === 'Economics') {
    return {
      degreeName: program.name,
      specializations: ['Corporate Finance & Investment', 'Digital Marketing & Strategy', 'Supply Chain Management', 'Economic Data Analytics'],
      potentialCareers: ['Business Analyst', 'Financial Consultant', 'Entrepreneur', 'Corporate Manager', 'Economic Researcher'],
      recommendedSkills: ['Financial Modeling', 'Market Analysis', 'Strategic Management', 'Data Analysis', 'Leadership & Communication'],
      relevanceExplanation: `Combines your interest in business management with practical analytical methods to build leading enterprises and economic solutions.`
    };
  } else {
    return {
      degreeName: program.name,
      specializations: ['General Practice', 'Specialized Research', 'Applied Consultancy'],
      potentialCareers: ['Legal Counsel', 'Specialist Consultant', 'Policy Advisor', 'Academic Researcher'],
      recommendedSkills: ['Critical Analysis', 'Technical Writing', 'Public Speaking', 'Domain Knowledge'],
      relevanceExplanation: `Aligns with your academic background and strategic learning preferences.`
    };
  }
}

function generateRuleExplanation(
  profile: StudentProfile,
  program: Program,
  university: University,
  scores: MatchScores,
  status: EligibilityStatus
): string {
  const mathStr = profile.subjectMarks.mathematics ? `Mathematics (${profile.subjectMarks.mathematics})` : '';
  const bioStr = profile.subjectMarks.biology ? `Biology (${profile.subjectMarks.biology})` : '';
  const physStr = profile.subjectMarks.physics ? `Physics (${profile.subjectMarks.physics})` : '';
  const ecoStr = profile.subjectMarks.economics ? `Economics (${profile.subjectMarks.economics})` : '';
  const geoStr = profile.subjectMarks.geography ? `Geography (${profile.subjectMarks.geography})` : '';
  const histStr = profile.subjectMarks.history ? `History (${profile.subjectMarks.history})` : '';

  const strengths = [mathStr, physStr, bioStr, ecoStr, geoStr, histStr].filter(Boolean).join(', ');

  let statusSentence = '';
  if (status === 'eligible') {
    statusSentence = `Your total score of ${profile.totalMarks} meets the benchmark requirement of ${program.minTotalMarks} marks.`;
  } else if (status === 'possibly_eligible') {
    statusSentence = `Your total score is near the cut-off threshold (${program.minTotalMarks} marks). Verify exact subject prerequisite breakdowns.`;
  } else {
    statusSentence = `Your total score is currently below the historical benchmark of ${program.minTotalMarks} marks, but related foundation pathways may be considered.`;
  }

  return `Recommended based on your performance in ${strengths || 'key subjects'} and your total matriculation result (${profile.totalMarks} marks). ${statusSentence} This degree directly connects your interests in ${profile.interests.slice(0, 2).join(' and ') || 'the field'} to prospective career goals as a ${profile.careerGoals.slice(0, 2).join(' or ') || 'professional'}.`;
}
