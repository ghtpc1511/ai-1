import type { Season } from '@/types';

/**
 * Get current season based on date
 */
export function getCurrentSeason(date: Date = new Date()): Season {
  const month = date.getMonth() + 1; // 1-12
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

/**
 * Get months for a season
 */
export function getSeasonMonths(season: Season): number[] {
  switch (season) {
    case 'spring': return [3, 4, 5];
    case 'summer': return [6, 7, 8];
    case 'autumn': return [9, 10, 11];
    case 'winter': return [12, 1, 2];
  }
}

/**
 * Check if a recipe matches the given season
 */
export function matchesSeason(recipeSeasonsJson: string | null, targetSeason: Season): boolean {
  if (!recipeSeasonsJson) return true; // null = all seasons
  try {
    const seasons: Season[] = JSON.parse(recipeSeasonsJson);
    return seasons.includes(targetSeason);
  } catch {
    return true;
  }
}
