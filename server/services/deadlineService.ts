import { getUniversityData } from "../database/dataStore";
import { ApplicationDeadline } from "../../src/types";

export function getDeadlines(): ApplicationDeadline[] {
  return getUniversityData().deadlines;
}
