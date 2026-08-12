import { useState } from 'react';
import { Recommendation } from '../types';

export function useRecommendations(initialRecommendations: Recommendation[] = []) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);

  return {
    recommendations,
    setRecommendations,
  };
}
