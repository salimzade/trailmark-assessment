import { useEffect, useState } from 'react';
import { fetchTrailCondition } from '../mockApi';
import { TrailCondition } from '../types';

export function useTrailConditions(trailId: string | null) {
  const [condition, setCondition] = useState<TrailCondition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trailId) {
      setCondition(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchTrailCondition(trailId).then(
      data => {
        setCondition(data);
        setIsLoading(false);
      },
      err => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      },
    );
  }, [trailId]);

  return { condition, isLoading, error };
}
