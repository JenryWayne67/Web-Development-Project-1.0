import { Request, Response } from "express";
import { getPrograms, getUniversities, getProgramById, getUniversityById } from "../services/universityService";
import { getScholarships } from "../services/scholarshipService";
import { getDeadlines } from "../services/deadlineService";

export async function getUniversitiesController(_req: Request, res: Response) {
  res.json({ universities: getUniversities() });
}

export async function getProgramsController(req: Request, res: Response) {
  const { location, field, search } = req.query;
  const programs = getPrograms({
    location: typeof location === "string" ? location : undefined,
    field: typeof field === "string" ? field : undefined,
    search: typeof search === "string" ? search : undefined,
  });

  res.json({ programs });
}

export async function getProgramDetailsController(req: Request, res: Response) {
  const program = getProgramById(req.params.id);
  if (!program) {
    return res.status(404).json({ error: "Program not found" });
  }

  const university = getUniversityById(program.universityId);
  const scholarships = getScholarships().filter(
    (s) => s.universityId === program.universityId || !s.universityId
  );
  const deadlines = getDeadlines().filter((d) => d.universityId === program.universityId);

  return res.json({ program, university, scholarships, deadlines });
}

export async function getScholarshipsController(_req: Request, res: Response) {
  res.json({ scholarships: getScholarships() });
}

export async function getDeadlinesController(_req: Request, res: Response) {
  res.json({ deadlines: getDeadlines() });
}
