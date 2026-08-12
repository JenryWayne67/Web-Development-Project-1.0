import { getUniversityData } from "../database/dataStore";
import { Program, University } from "../../src/types";

export function getUniversities(): University[] {
  return getUniversityData().universities;
}

export function getPrograms(params?: { location?: string; field?: string; search?: string }): Program[] {
  const { programs } = getUniversityData();
  const { location, field, search } = params ?? {};
  let list = [...programs];

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

  return list;
}

export function getProgramById(id: string): Program | undefined {
  return getUniversityData().programs.find((program) => program.id === id);
}

export function getUniversityById(id: string): University | undefined {
  return getUniversityData().universities.find((university) => university.id === id);
}
