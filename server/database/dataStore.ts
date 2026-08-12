import {
  SAMPLE_DEADLINES,
  SAMPLE_PROGRAMS,
  SAMPLE_SCHOLARSHIPS,
  SAMPLE_UNIVERSITIES,
} from "../../src/data";

export const universityData = {
  universities: SAMPLE_UNIVERSITIES,
  programs: SAMPLE_PROGRAMS,
  scholarships: SAMPLE_SCHOLARSHIPS,
  deadlines: SAMPLE_DEADLINES,
};

export function getUniversityData() {
  return {
    universities: [...SAMPLE_UNIVERSITIES],
    programs: [...SAMPLE_PROGRAMS],
    scholarships: [...SAMPLE_SCHOLARSHIPS],
    deadlines: [...SAMPLE_DEADLINES],
  };
}
