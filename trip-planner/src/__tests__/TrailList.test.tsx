import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TrailList } from '../components/TrailList';
import { Trail, FilterOptions } from '../types';

const originalMockTrails: Trail[] = [
  { id: '1', name: 'Easy Walk', distance: 3, difficulty: 'easy', elevation: 200, region: 'North' },
  { id: '2', name: 'Hard Climb', distance: 15, difficulty: 'hard', elevation: 2000, region: 'East' },
  { id: '3', name: 'Moderate Loop', distance: 8, difficulty: 'moderate', elevation: 1000, region: 'West' },
];

let mockTrails: Trail[];

describe('TrailList', () => {
  beforeEach(() => {
    mockTrails = JSON.parse(JSON.stringify(originalMockTrails));
  });
  describe('sorting', () => {
    it('should maintain list integrity when sorting by distance', () => {
      render(
        <TrailList
          trails={mockTrails}
          filters={{ difficulty: null, region: null, maxDistance: null }}
          onSelectTrail={() => {}}
        />,
      );

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);

      const names = items.map(item => item.textContent);
      expect(names[0]).toContain('Easy Walk');
      expect(names[1]).toContain('Moderate Loop');
      expect(names[2]).toContain('Hard Climb');
    });

    it('should correctly sort by distance in descending order', async () => {
      render(
        <TrailList
          trails={mockTrails}
          filters={{ difficulty: null, region: null, maxDistance: null }}
          onSelectTrail={() => {}}
        />,
      );

      const sortButton = screen.getByRole('button', { name: /distance/i });
      await userEvent.click(sortButton);

      const items = screen.getAllByRole('listitem');
      const names = items.map(item => item.textContent);
      expect(names[0]).toContain('Hard Climb');
      expect(names[2]).toContain('Easy Walk');
    });
  });

  describe('filtering', () => {
    it('should display correct count of filtered trails', () => {
      const filters: FilterOptions = {
        difficulty: 'easy',
        region: null,
        maxDistance: null,
      };

      render(
        <TrailList
          trails={mockTrails}
          filters={filters}
          onSelectTrail={() => {}}
        />,
      );

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(1);
      expect(items[0]).toHaveTextContent('Easy Walk');
    });

    it('should filter by distance correctly', () => {
      const filters: FilterOptions = {
        difficulty: null,
        region: null,
        maxDistance: 10,
      };

      render(
        <TrailList
          trails={mockTrails}
          filters={filters}
          onSelectTrail={() => {}}
        />,
      );

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent('Easy Walk');
      expect(items[1]).toHaveTextContent('Moderate Loop');
    });
  });

  describe('selection', () => {
    it('should call onSelectTrail when a trail is clicked', async () => {
      const mockSelect = vi.fn();
      render(
        <TrailList
          trails={mockTrails}
          filters={{ difficulty: null, region: null, maxDistance: null }}
          onSelectTrail={mockSelect}
          selectedTrailId={undefined}
        />,
      );

      const trailItems = screen.getAllByRole('listitem');
      await userEvent.click(trailItems[0]);

      expect(mockSelect).toHaveBeenCalledWith(mockTrails[0]);
    });

    it('should highlight selected trail with correct styling', () => {
      render(
        <TrailList
          trails={mockTrails}
          filters={{ difficulty: null, region: null, maxDistance: null }}
          onSelectTrail={() => {}}
          selectedTrailId="2"
        />,
      );

      const trailItems = screen.getAllByRole('listitem');
      expect(trailItems[2]).toHaveClass('selected');
      expect(trailItems[0]).not.toHaveClass('selected');
    });
  });

  describe('edge cases', () => {
    it('should handle empty trail list gracefully', () => {
      render(
        <TrailList
          trails={[]}
          filters={{ difficulty: null, region: null, maxDistance: null }}
          onSelectTrail={() => {}}
        />,
      );

      expect(screen.getByText(/no trails match/i)).toBeInTheDocument();
    });

    it('should not mutate original trails array when sorting', async () => {
      const trailsCopy = [...mockTrails];
      const originalOrder = trailsCopy.map(t => t.id);

      render(
        <TrailList
          trails={mockTrails}
          filters={{ difficulty: null, region: null, maxDistance: null }}
          onSelectTrail={() => {}}
        />,
      );

      const sortButton = screen.getByRole('button', { name: /distance/i });
      await userEvent.click(sortButton);

      const afterSortOrder = mockTrails.map(t => t.id);
      expect(afterSortOrder).toEqual(originalOrder);
    });
  });
});
