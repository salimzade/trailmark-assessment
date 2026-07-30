import { Trail } from '../types';
import { useTrailConditions } from '../hooks/useTrailConditions';
import './ConditionPanel.css';

interface ConditionPanelProps {
  selectedTrail: Trail | null;
}

export function ConditionPanel({ selectedTrail }: ConditionPanelProps) {
  const { condition, isLoading, error } = useTrailConditions(selectedTrail?.id ?? null);

  if (!selectedTrail) {
    return <div className="condition-panel empty">Select a trail to view conditions</div>;
  }

  return (
    <div className="condition-panel">
      <h2>{selectedTrail.name}</h2>
      <div className="trail-details">
        <p>
          <strong>Distance:</strong> {selectedTrail.distance} km
        </p>
        <p>
          <strong>Elevation:</strong> {selectedTrail.elevation}m
        </p>
        <p>
          <strong>Region:</strong> {selectedTrail.region}
        </p>
      </div>

      <div className="condition-section">
        <h3>Current Conditions</h3>
        {isLoading && <div className="loading">Loading conditions...</div>}
        {error && <div className="error">Error: {error}</div>}
        {condition && (
          <>
            <p>
              <strong>Status:</strong> <span className={condition.isOpen ? 'open' : 'closed'}>{condition.isOpen ? 'Open' : 'Closed'}</span>
            </p>
            <p>
              <strong>Weather:</strong> {condition.weather}
            </p>
            {condition.hazards.length > 0 && (
              <div className="hazards">
                <strong>Hazards:</strong>
                <ul>
                  {condition.hazards.map((hazard, i) => (
                    <li key={i}>{hazard}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="updated">
              <small>Last updated {new Date(condition.lastUpdated).toLocaleString()}</small>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
