import type { Season, AgeGroup, MealType } from '@/types';
import { AGE_GROUPS } from '@/types';
import { matchesSeason } from '../utils/season';
import { generateId } from '../utils/constants';
import {
  getAllPublishedRecipesForScoring,
  clearRecommendations,
  insertRecommendation,
} from '../db/recommendations';

interface ScoringInput {
  id: string;
  meal_type: string;
  min_age_months: number;
  max_age_months: number;
  suitable_seasons: string;
  difficulty_level: number;
  cook_time_minutes: number;
  source_quality_score: number;
  created_at: string;
}

function calcAgeScore(recipe: ScoringInput, ageGroup: { min: number; max: number }): number {
  const recipeMin = recipe.min_age_months;
  const recipeMax = recipe.max_age_months;
  const groupMid = (ageGroup.min + ageGroup.max) / 2;

  // No overlap at all
  if (recipeMin > ageGroup.max || recipeMax < ageGroup.min) return 0;

  // Perfect coverage
  if (recipeMin <= ageGroup.min && recipeMax >= ageGroup.max) return 1.0;

  // Partial overlap
  const overlapStart = Math.max(recipeMin, ageGroup.min);
  const overlapEnd = Math.min(recipeMax, ageGroup.max);
  const overlapRange = overlapEnd - overlapStart;
  const groupRange = ageGroup.max - ageGroup.min;
  return Math.max(0.5, overlapRange / groupRange);
}

function calcSeasonScore(recipe: ScoringInput, season: Season): number {
  if (matchesSeason(recipe.suitable_seasons, season)) return 1.0;
  // Check if it's an all-season recipe
  try {
    const seasons = JSON.parse(recipe.suitable_seasons || '[]');
    if (seasons.length === 4) return 0.7;
  } catch {}
  return 0.3;
}

function calcDifficultyScore(difficulty: number): number {
  switch (difficulty) {
    case 1: return 1.0;
    case 2: return 0.7;
    case 3: return 0.4;
    default: return 0.5;
  }
}

function calcCookTimeScore(minutes: number): number {
  if (minutes <= 15) return 1.0;
  if (minutes <= 25) return 0.8;
  if (minutes <= 35) return 0.6;
  return 0.4;
}

function calcFreshnessScore(createdAt: string): number {
  const now = Date.now();
  const created = new Date(createdAt).getTime();
  const daysDiff = (now - created) / (1000 * 60 * 60 * 24);
  if (daysDiff <= 7) return 1.0;
  if (daysDiff <= 30) return 0.7;
  if (daysDiff <= 90) return 0.5;
  return 0.3;
}

function calcRecommendationScore(
  recipe: ScoringInput,
  ageGroup: { min: number; max: number },
  season: Season
): number {
  const ageScore = calcAgeScore(recipe, ageGroup);
  if (ageScore === 0) return 0; // hard filter

  const seasonScore = calcSeasonScore(recipe, season);
  const difficultyScore = calcDifficultyScore(recipe.difficulty_level);
  const cookTimeScore = calcCookTimeScore(recipe.cook_time_minutes);
  const qualityScore = recipe.source_quality_score;
  const freshnessScore = calcFreshnessScore(recipe.created_at);

  return (
    ageScore * 0.30 +
    seasonScore * 0.20 +
    difficultyScore * 0.15 +
    cookTimeScore * 0.15 +
    qualityScore * 0.10 +
    freshnessScore * 0.10
  ) * 100;
}

export async function computeRecommendations(
  season: Season
): Promise<{ featured: number; feed: number }> {
  const allRecipes = await getAllPublishedRecipesForScoring();
  let featuredCount = 0;
  let feedCount = 0;

  for (const ag of AGE_GROUPS) {
    // Clear old recommendations for this age group + season
    await clearRecommendations(ag.key, season);

    // Score all recipes for this age group
    const scored = allRecipes
      .map((r) => ({
        recipe: r,
        score: calcRecommendationScore(r, { min: ag.min, max: ag.max }, season),
      }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    // Group by meal type for featured
    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];

    for (const mt of mealTypes) {
      const mealScored = scored.filter((s) => s.recipe.meal_type === mt);

      // Top 5 as featured
      const featured = mealScored.slice(0, 5);
      for (const item of featured) {
        await insertRecommendation({
          id: generateId(),
          recipeId: item.recipe.id,
          ageGroup: ag.key,
          season,
          mealType: mt,
          score: item.score,
          isFeatured: true,
          reason: '本周精选推荐',
        });
        featuredCount++;
      }

      // Next items as feed (up to ~7 per meal type, max 20 total across all types)
      const feedItems = mealScored.slice(5, 12);
      for (let i = 0; i < feedItems.length; i++) {
        await insertRecommendation({
          id: generateId(),
          recipeId: feedItems[i].recipe.id,
          ageGroup: ag.key,
          season,
          mealType: mt,
          score: feedItems[i].score,
          isFeatured: false,
          feedRank: i + 1,
          reason: '更多好菜推荐',
        });
        feedCount++;
      }
    }
  }

  return { featured: featuredCount, feed: feedCount };
}
