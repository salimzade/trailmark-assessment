import { useMemo, useState } from 'react';
import { Trail, FilterOptions, SortField, SortOrder } from '../types';
import './TrailList.css';

interface TrailListProps {
  trails: Trail[];
  filters: FilterOptions;
  onSelectTrail: (trail: Trail) => void;
  selectedTrailId?: string | undefined;
}

export function TrailList({ trails, filters, onSelectTrail, selectedTrailId }: TrailListProps) {
  const [sortField, setSortField] = useState<SortField>('distance');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSorted = useMemo(() => {
    let result = [...trails];

    if (filters.difficulty) {
      result = result.filter(t => t.difficulty === filters.difficulty);
    }

    if (filters.region) {
      result = result.filter(t => t.region === filters.region);
    }

    if (filters.maxDistance !== null) {
      const maxDist = filters.maxDistance;
      result = result.filter(t => t.distance <= maxDist);
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [trails, filters, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="trail-list">
      <div className="list-header">
        <h2>Trails</h2>
        <span className="trail-count">{filteredAndSorted.length} trails</span>
      </div>

      <div className="sort-controls">
        <button onClick={() => handleSort('name')}>Name {sortField === 'name' && '▼'}</button>
        <button onClick={() => handleSort('distance')}>Distance {sortField === 'distance' && '▼'}</button>
        <button onClick={() => handleSort('difficulty')}>Difficulty {sortField === 'difficulty' && '▼'}</button>
        <button onClick={() => handleSort('elevation')}>Elevation {sortField === 'elevation' && '▼'}</button>
      </div>

      <ul className="trails">
        {filteredAndSorted.map((trail) => (
          <li
            key={trail.id}
            className={`trail-item ${selectedTrailId === trail.id ? 'selected' : ''}`}
            onClick={() => onSelectTrail(trail)}
          >
            <div className="trail-name">{trail.name}</div>
            <div className="trail-meta">
              <span>{trail.distance} km</span>
              <span className={`difficulty ${trail.difficulty}`}>{trail.difficulty}</span>
              <span>{trail.elevation}m</span>
            </div>
          </li>
        ))}
      </ul>

      {filteredAndSorted.length === 0 && <div className="no-trails">No trails match your filters.</div>}
    </div>
  );
}
