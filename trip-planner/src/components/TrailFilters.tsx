import { useEffect, useState } from 'react';
import { FilterOptions } from '../types';
import './TrailFilters.css';

interface TrailFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  regions: string[];
}

export function TrailFilters({ onFilterChange, regions }: TrailFiltersProps) {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      onFilterChange({
        difficulty,
        region,
        maxDistance,
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="filters">
      <h3>Filters</h3>

      <label>
        Difficulty:
        <select value={difficulty ?? ''} onChange={e => setDifficulty(e.target.value || null)}>
          <option value="">All</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <label>
        Region:
        <select value={region ?? ''} onChange={e => setRegion(e.target.value || null)}>
          <option value="">All</option>
          {regions.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label>
        Max Distance (km):
        <input
          type="number"
          value={maxDistance ?? ''}
          onChange={e => setMaxDistance(e.target.value ? parseFloat(e.target.value) : null)}
          placeholder="No limit"
        />
      </label>
    </div>
  );
}
