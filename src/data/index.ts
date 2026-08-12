import type { ApplicationDeadline, Program, Scholarship, University } from '../types';

import universitiesData from '../../data/universities.json';
import programsData from '../../data/programs.json';
import scholarshipsData from '../../data/scholarships.json';
import deadlinesData from '../../data/deadlines.json';

export const SAMPLE_UNIVERSITIES = universitiesData as University[];
export const SAMPLE_PROGRAMS = programsData as Program[];
export const SAMPLE_SCHOLARSHIPS = scholarshipsData as Scholarship[];
export const SAMPLE_DEADLINES = deadlinesData as ApplicationDeadline[];

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
