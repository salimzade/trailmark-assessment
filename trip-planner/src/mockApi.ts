import { Trail, TrailCondition } from './types';

export const MOCK_TRAILS: Trail[] = [
  { id: '1', name: 'Sunset Peak', distance: 5.2, difficulty: 'easy', elevation: 800, region: 'North' },
  { id: '2', name: 'Eagle Ridge', distance: 12.4, difficulty: 'hard', elevation: 2100, region: 'East' },
  { id: '3', name: 'Forest Loop', distance: 8.1, difficulty: 'moderate', elevation: 1200, region: 'West' },
  { id: '4', name: 'Mountain Pass', distance: 15.5, difficulty: 'hard', elevation: 2800, region: 'North' },
  { id: '5', name: 'Lake Trail', distance: 6.3, difficulty: 'easy', elevation: 500, region: 'South' },
  { id: '6', name: 'Canyon Rim', distance: 10.7, difficulty: 'moderate', elevation: 1500, region: 'East' },
];

const MOCK_CONDITIONS: Record<string, TrailCondition> = {
  '1': { trailId: '1', isOpen: true, weather: 'Clear', lastUpdated: Date.now(), hazards: [] },
  '2': { trailId: '2', isOpen: true, weather: 'Cloudy', lastUpdated: Date.now(), hazards: ['Loose rocks'] },
  '3': { trailId: '3', isOpen: false, weather: 'Rainy', lastUpdated: Date.now(), hazards: ['Wet rocks', 'Flooding'] },
  '4': { trailId: '4', isOpen: true, weather: 'Partly cloudy', lastUpdated: Date.now(), hazards: ['High winds'] },
  '5': { trailId: '5', isOpen: true, weather: 'Clear', lastUpdated: Date.now(), hazards: [] },
  '6': { trailId: '6', isOpen: true, weather: 'Foggy', lastUpdated: Date.now(), hazards: ['Limited visibility'] },
};

export async function fetchTrailCondition(trailId: string): Promise<TrailCondition> {
  const delay = Math.random() * 2000 + 500;
  await new Promise(resolve => setTimeout(resolve, delay));

  const condition = MOCK_CONDITIONS[trailId];
  if (!condition) {
    throw new Error(`Trail ${trailId} not found`);
  }

  return condition;
}
