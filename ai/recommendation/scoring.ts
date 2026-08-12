import {
  EligibilityStatus,
  MatchScores,
  Program,
  Recommendation,
  RequirementDetail,
  StudentProfile,
  SubjectMarks,
  University,
} from "../../src/types";
import { SAMPLE_SCHOLARSHIPS } from "../../src/data";
import { generateCareerPathwayForProgram } from "../career/careerPathway";

export function calculateProgramMatch(
  profile: StudentProfile,
  program: Program,
  university: University
): Recommendation {
  const eligibilityDetails: RequirementDetail[] = [];
  let totalReqMet = true;
  let totalReqUncertain = false;

  const studentTotal = profile.totalMarks || 0;
  const minTotal = program.minTotalMarks || 0;

  if (studentTotal >= minTotal) {
    eligibilityDetails.push({
      requirementName: "Total Matriculation Marks",
      minVal: minTotal,
      studentVal: studentTotal,
      met: true,
      note: `Student achieved ${studentTotal} marks (Required: ≥ ${minTotal})`,
    });
  } else {
    totalReqMet = false;
    eligibilityDetails.push({
      requirementName: "Total Matriculation Marks",
      minVal: minTotal,
      studentVal: studentTotal,
      met: false,
      note: `Student achieved ${studentTotal} marks, which is below the requirement of ${minTotal}`,
    });
  }

  let subjectScoreSum = 0;
  const requiredSubjectCount = program.requiredSubjects.length;

  for (const reqSub of program.requiredSubjects) {
    const rawMark = profile.subjectMarks[reqSub.subject as keyof SubjectMarks];
    const studentMark = typeof rawMark === "number" ? rawMark : undefined;
    const minMark = reqSub.minMark || 50;

    if (studentMark === undefined || Number.isNaN(studentMark)) {
      totalReqUncertain = true;
      eligibilityDetails.push({
        requirementName: `Required Subject: ${reqSub.subject.toUpperCase()}`,
        minVal: minMark,
        studentVal: undefined,
        met: "uncertain",
        note: `Mark for ${reqSub.subject} not specified`,
      });
    } else if (studentMark >= minMark) {
      const margin = studentMark - minMark;
      subjectScoreSum += Math.min(100, 75 + margin * 1.5);
      eligibilityDetails.push({
        requirementName: `Required Subject: ${reqSub.subject.toUpperCase()}`,
        minVal: minMark,
        studentVal: studentMark,
        met: true,
        note: `${reqSub.subject.toUpperCase()} mark ${studentMark} satisfies minimum ${minMark}`,
      });
    } else {
      totalReqMet = false;
      eligibilityDetails.push({
        requirementName: `Required Subject: ${reqSub.subject.toUpperCase()}`,
        minVal: minMark,
        studentVal: studentMark,
        met: false,
        note: `${reqSub.subject.toUpperCase()} mark ${studentMark} is below required ${minMark}`,
      });
    }
  }

  let academicMatch = 0;
  if (minTotal > 0) {
    const totalRatio = studentTotal / minTotal;
    const baseTotalScore = Math.min(100, totalRatio * 85);
    const avgSubScore = requiredSubjectCount > 0 ? subjectScoreSum / requiredSubjectCount : 80;
    academicMatch = Math.round(baseTotalScore * 0.6 + avgSubScore * 0.4);
  } else {
    academicMatch = 80;
  }
  academicMatch = Math.min(99, Math.max(30, academicMatch));

  let eligibilityStatus: EligibilityStatus = "eligible";
  if (!totalReqMet) {
    eligibilityStatus = "not_eligible";
  } else if (totalReqUncertain) {
    eligibilityStatus = "possibly_eligible";
  }

  let interestMatch = 60;
  const studentInterests = profile.interests || [];
  const programField = program.field.toLowerCase();
  const programName = program.name.toLowerCase();

  let interestHits = 0;
  for (const interest of studentInterests) {
    const lowerInt = interest.toLowerCase();
    if (programField.includes(lowerInt) || programName.includes(lowerInt) || lowerInt.includes(programField)) {
      interestHits += 2;
    } else if (
      (lowerInt.includes("computer") && programField.includes("computer")) ||
      (lowerInt.includes("ai") && (programName.includes("ai") || programName.includes("artificial intelligence"))) ||
      (lowerInt.includes("engineering") && programField.includes("engineering")) ||
      (lowerInt.includes("medicine") && programField.includes("medicine")) ||
      (lowerInt.includes("business") && (programField.includes("business") || programField.includes("economics"))) ||
      (lowerInt.includes("law") && programField.includes("law"))
    ) {
      interestHits += 2;
    }
  }

  if (studentInterests.length > 0) {
    interestMatch = Math.min(98, 65 + (interestHits / studentInterests.length) * 35);
  }

  let careerMatch = 65;
  const studentCareers = profile.careerGoals || [];
  const isUndecided = studentCareers.includes("Undecided") || studentCareers.includes("I'm not sure yet");

  if (isUndecided) {
    careerMatch = 80;
  } else if (studentCareers.length > 0) {
    let careerHits = 0;
    for (const career of studentCareers) {
      const c = career.toLowerCase();
      if (
        (c.includes("software") || c.includes("ai") || c.includes("developer") || c.includes("data")) &&
        programField.includes("computer")
      ) {
        careerHits += 1;
      } else if (c.includes("engineer") && programField.includes("engineering")) {
        careerHits += 1;
      } else if ((c.includes("doctor") || c.includes("health")) && programField.includes("medicine")) {
        careerHits += 1;
      } else if (
        (c.includes("manager") || c.includes("entrepreneur") || c.includes("accountant")) &&
        (programField.includes("business") || programField.includes("economics"))
      ) {
        careerHits += 1;
      } else if (c.includes("lawyer") && programField.includes("law")) {
        careerHits += 1;
      } else if (c.includes("scientist") && (programField.includes("science") || programField.includes("agriculture"))) {
        careerHits += 1;
      }
    }
    careerMatch = Math.min(98, 70 + (careerHits / Math.max(1, studentCareers.length)) * 28);
  }

  let locationMatch = 75;
  const prefLoc = profile.preferredLocation;
  if (!prefLoc || prefLoc === "No preference" || prefLoc === "Any" || prefLoc === "Other") {
    locationMatch = 90;
  } else if (university.location.toLowerCase() === prefLoc.toLowerCase()) {
    locationMatch = 98;
  } else {
    locationMatch = 60;
  }

  let learningMatch = 80;
  if (profile.learningPreference === "not_sure") {
    learningMatch = 85;
  } else if (profile.learningPreference === program.learningStyle) {
    learningMatch = 95;
  } else if (profile.learningPreference === "balanced" || program.learningStyle === "balanced") {
    learningMatch = 88;
  } else {
    learningMatch = 70;
  }

  const overallMatch = Math.round(
    academicMatch * 0.35 +
      interestMatch * 0.25 +
      careerMatch * 0.25 +
      locationMatch * 0.1 +
      learningMatch * 0.05
  );

  const matchScores: MatchScores = {
    overallMatch: Math.min(99, Math.max(40, overallMatch)),
    academicMatch,
    interestMatch: Math.round(interestMatch),
    careerMatch: Math.round(careerMatch),
    locationMatch,
    learningMatch,
  };

  const careerPathway = generateCareerPathwayForProgram(program, profile);
  const availableScholarships = SAMPLE_SCHOLARSHIPS.filter(
    (s) => s.universityId === program.universityId || !s.universityId
  );
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
    availableScholarships,
  };
}

export function generateRuleExplanation(
  profile: StudentProfile,
  program: Program,
  _university: University,
  _scores: MatchScores,
  status: EligibilityStatus
): string {
  const mathStr = profile.subjectMarks.mathematics ? `Mathematics (${profile.subjectMarks.mathematics})` : "";
  const bioStr = profile.subjectMarks.biology ? `Biology (${profile.subjectMarks.biology})` : "";
  const physStr = profile.subjectMarks.physics ? `Physics (${profile.subjectMarks.physics})` : "";
  const ecoStr = profile.subjectMarks.economics ? `Economics (${profile.subjectMarks.economics})` : "";
  const geoStr = profile.subjectMarks.geography ? `Geography (${profile.subjectMarks.geography})` : "";
  const histStr = profile.subjectMarks.history ? `History (${profile.subjectMarks.history})` : "";

  const strengths = [mathStr, physStr, bioStr, ecoStr, geoStr, histStr].filter(Boolean).join(", ");

  let statusSentence = "";
  if (status === "eligible") {
    statusSentence = `Your total score of ${profile.totalMarks} meets the benchmark requirement of ${program.minTotalMarks} marks.`;
  } else if (status === "possibly_eligible") {
    statusSentence = `Your total score is near the cut-off threshold (${program.minTotalMarks} marks). Verify exact subject prerequisite breakdowns.`;
  } else {
    statusSentence = `Your total score is currently below the historical benchmark of ${program.minTotalMarks} marks, but related foundation pathways may be considered.`;
  }

  return `Recommended based on your performance in ${strengths || "key subjects"} and your total matriculation result (${profile.totalMarks} marks). ${statusSentence} This degree directly connects your interests in ${profile.interests.slice(0, 2).join(" and ") || "the field"} to prospective career goals as a ${profile.careerGoals.slice(0, 2).join(" or ") || "professional"}.`;
}
