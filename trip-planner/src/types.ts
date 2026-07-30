export interface Trail {
  id: string;
  name: string;
  distance: number;
  difficulty: 'easy' | 'moderate' | 'hard';
  elevation: number;
  region: string;
}

export interface TrailCondition {
  trailId: string;
  isOpen: boolean;
  weather: string;
  lastUpdated: number;
  hazards: string[];
}

export interface FilterOptions {
  difficulty: string | null;
  region: string | null;
  maxDistance: number | null;
}

export type SortField = 'distance' | 'difficulty' | 'elevation' | 'name';

export type SortOrder = 'asc' | 'desc';
