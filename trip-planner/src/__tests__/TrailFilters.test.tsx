import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TrailFilters } from '../components/TrailFilters';

describe('TrailFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reports the currently selected filter values on each periodic tick, not the values from first render', () => {
    const onFilterChange = vi.fn();

    render(<TrailFilters onFilterChange={onFilterChange} regions={['North', 'East']} />);

    fireEvent.change(screen.getByLabelText(/difficulty/i), { target: { value: 'hard' } });
    fireEvent.change(screen.getByLabelText(/region/i), { target: { value: 'East' } });

    vi.advanceTimersByTime(2000);

    expect(onFilterChange).toHaveBeenLastCalledWith({
      difficulty: 'hard',
      region: 'East',
      maxDistance: null,
    });
  });
});
