import { CareerPathway, Program, StudentProfile } from "../../src/types";

export function generateCareerPathwayForProgram(program: Program, profile: StudentProfile): CareerPathway {
  const field = program.field;
  if (field === "Computer Science" || field === "Artificial Intelligence") {
    return {
      degreeName: program.name,
      specializations: [
        "Artificial Intelligence & Machine Learning",
        "Full-Stack Software Engineering",
        "Cybersecurity",
        "Cloud & Data Engineering",
      ],
      potentialCareers: [
        "Software Engineer",
        "AI Specialist",
        "Data Scientist",
        "Solutions Architect",
        "Cybersecurity Analyst",
      ],
      recommendedSkills: [
        "Python & JavaScript/TypeScript",
        "Data Structures & Algorithms",
        "Relational & NoSQL Databases",
        "System Architecture",
        "Problem Solving",
      ],
      relevanceExplanation: `Given your score in Mathematics (${profile.subjectMarks.mathematics ?? "N/A"}) and interests in tech, this degree equips you with foundational computational theory and industry software design skills.`,
    };
  } else if (field === "Engineering") {
    return {
      degreeName: program.name,
      specializations: [
        "Structural & Infrastructure Design",
        "Automation & Robotics",
        "Power & Energy Systems",
        "Embedded Systems",
      ],
      potentialCareers: [
        "Civil / Electrical / Mechanical Engineer",
        "Project Manager",
        "Industrial Automation Engineer",
        "Technical Consultant",
      ],
      recommendedSkills: [
        "Advanced Mathematics & Physics",
        "CAD Software & Simulation",
        "Project Management",
        "Safety Standards",
        "Technical Drawing",
      ],
      relevanceExplanation: `This engineering pathway leverages your analytical physics and math foundation to design real-world physical and electronic systems.`,
    };
  } else if (field === "Medicine") {
    return {
      degreeName: program.name,
      specializations: ["General Medicine", "Surgery", "Pediatrics", "Public Health & Epidemiology", "Clinical Research"],
      potentialCareers: ["Medical Doctor (M.B., B.S.)", "Surgeon", "Public Health Officer", "Clinical Researcher"],
      recommendedSkills: [
        "Human Anatomy & Physiology",
        "Clinical Diagnostics",
        "Patient Communication",
        "Empathy & Crisis Resilience",
        "Medical Ethics",
      ],
      relevanceExplanation: `Matches your high Biology mark (${profile.subjectMarks.biology ?? "N/A"}) and interest in medical sciences to prepare you for a lifetime of healthcare service.`,
    };
  } else if (field === "Business" || field === "Economics") {
    return {
      degreeName: program.name,
      specializations: [
        "Corporate Finance & Investment",
        "Digital Marketing & Strategy",
        "Supply Chain Management",
        "Economic Data Analytics",
      ],
      potentialCareers: ["Business Analyst", "Financial Consultant", "Entrepreneur", "Corporate Manager", "Economic Researcher"],
      recommendedSkills: [
        "Financial Modeling",
        "Market Analysis",
        "Strategic Management",
        "Data Analysis",
        "Leadership & Communication",
      ],
      relevanceExplanation: `Combines your interest in business management with practical analytical methods to build leading enterprises and economic solutions.`,
    };
  }

  return {
    degreeName: program.name,
    specializations: ["General Practice", "Specialized Research", "Applied Consultancy"],
    potentialCareers: ["Legal Counsel", "Specialist Consultant", "Policy Advisor", "Academic Researcher"],
    recommendedSkills: ["Critical Analysis", "Technical Writing", "Public Speaking", "Domain Knowledge"],
    relevanceExplanation: `Aligns with your academic background and strategic learning preferences.`,
  };
}
