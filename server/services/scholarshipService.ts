import { getUniversityData } from "../database/dataStore";
import { Scholarship } from "../../src/types";

export function getScholarships(): Scholarship[] {
  return getUniversityData().scholarships;
}
