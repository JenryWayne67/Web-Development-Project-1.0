import { useState } from 'react';
import { StudentProfile } from '../types';

export function useStudentProfile(initialProfile?: StudentProfile | null) {
  const [profile, setProfile] = useState<StudentProfile | null>(initialProfile ?? null);

  return {
    profile,
    setProfile,
  };
}
