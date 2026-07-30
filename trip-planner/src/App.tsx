import { useCallback, useMemo, useState } from 'react';
import { Trail, FilterOptions } from './types';
import { MOCK_TRAILS } from './mockApi';
import { TrailList } from './components/TrailList';
import { TrailFilters } from './components/TrailFilters';
import { ConditionPanel } from './components/ConditionPanel';
import './App.css';

export default function App() {
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    difficulty: null,
    region: null,
    maxDistance: null,
  });

  const regions = useMemo(() => {
    const regionSet = new Set(MOCK_TRAILS.map(t => t.region));
    return Array.from(regionSet).sort();
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Trailmark Trip Planner</h1>
        <p>Discover and plan your hiking adventures</p>
      </header>

      <div className="container">
        <aside className="sidebar">
          <TrailFilters onFilterChange={handleFilterChange} regions={regions} />
        </aside>

        <main className="main-content">
          <div className="content-grid">
            <TrailList
              trails={MOCK_TRAILS}
              filters={filters}
              onSelectTrail={setSelectedTrail}
              selectedTrailId={selectedTrail?.id}
            />
            <ConditionPanel selectedTrail={selectedTrail} />
          </div>
        </main>
      </div>
    </div>
  );
}
