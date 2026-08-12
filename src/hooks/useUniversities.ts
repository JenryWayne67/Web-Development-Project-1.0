import { useEffect, useState } from 'react';
import { ApplicationDeadline, Program, Scholarship, University } from '../types';
import { fetchDeadlines, fetchPrograms, fetchScholarships, fetchUniversities } from '../services/api';

export function useUniversities() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [deadlines, setDeadlines] = useState<ApplicationDeadline[]>([]);

  useEffect(() => {
    async function loadData() {
      const [unis, progs, schs, dls] = await Promise.all([
        fetchUniversities(),
        fetchPrograms(),
        fetchScholarships(),
        fetchDeadlines(),
      ]);

      setUniversities(unis);
      setPrograms(progs);
      setScholarships(schs);
      setDeadlines(dls);
    }

    loadData();
  }, []);

  return {
    universities,
    programs,
    scholarships,
    deadlines,
  };
}
