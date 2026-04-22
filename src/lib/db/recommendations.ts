import { getDB } from '../cloudflare';
import type { Recipe, MealType, Season, AgeGroup, RecipeFeedItem } from '@/types';

interface RecommendationRow {
  id: string;
  recipe_id: string;
  age_group: string;
  season: string;
  meal_type: string;
  score: number;
  is_featured: number;
  feed_rank: number | null;
  reason: string | null;
  computed_at: string;
}

export async function getFeaturedRecipes(
  ageGroup: AgeGroup,
  season: Season,
  mealType: MealType,
  limit = 5
): Promise<string[]> {
  const db = await getDB();
  const rows = await db.prepare(
    `SELECT recipe_id FROM recommendations
     WHERE age_group = ? AND season = ? AND meal_type = ? AND is_featured = 1
     ORDER BY score DESC LIMIT ?`
  ).bind(ageGroup, season, mealType, limit).all();
  return (rows.results || []).map((r) => r.recipe_id as string);
}

export async function getFeedRecipeIds(
  ageGroup: AgeGroup,
  season: Season,
  page = 1,
  pageSize = 10
): Promise<{ ids: string[]; total: number }> {
  const db = await getDB();
  const countR = await db.prepare(
    `SELECT COUNT(*) as cnt FROM recommendations
     WHERE age_group = ? AND season = ? AND is_featured = 0`
  ).bind(ageGroup, season).first();
  const total = Math.min((countR?.cnt as number) || 0, 20); // hard cap at 20

  const offset = (page - 1) * pageSize;
  const rows = await db.prepare(
    `SELECT recipe_id, reason FROM recommendations
     WHERE age_group = ? AND season = ? AND is_featured = 0
     ORDER BY score DESC LIMIT ? OFFSET ?`
  ).bind(ageGroup, season, pageSize, offset).all();
  return {
    ids: (rows.results || []).map((r) => r.recipe_id as string),
    total,
  };
}

export async function clearRecommendations(ageGroup: AgeGroup, season: Season): Promise<void> {
  const db = await getDB();
  await db.prepare(
    'DELETE FROM recommendations WHERE age_group = ? AND season = ?'
  ).bind(ageGroup, season).run();
}

export async function insertRecommendation(rec: {
  id: string;
  recipeId: string;
  ageGroup: AgeGroup;
  season: Season;
  mealType: MealType;
  score: number;
  isFeatured: boolean;
  feedRank?: number;
  reason?: string;
}): Promise<void> {
  const db = await getDB();
  await db.prepare(`
    INSERT OR REPLACE INTO recommendations
    (id, recipe_id, age_group, season, meal_type, score, is_featured, feed_rank, reason, computed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).bind(
    rec.id, rec.recipeId, rec.ageGroup, rec.season,
    rec.mealType, rec.score, rec.isFeatured ? 1 : 0,
    rec.feedRank || null, rec.reason || null
  ).run();
}

export async function getAllPublishedRecipesForScoring(): Promise<{
  id: string;
  meal_type: string;
  min_age_months: number;
  max_age_months: number;
  suitable_seasons: string;
  difficulty_level: number;
  cook_time_minutes: number;
  source_quality_score: number;
  created_at: string;
}[]> {
  const db = await getDB();
  const rows = await db.prepare(
    `SELECT id, meal_type, min_age_months, max_age_months, suitable_seasons,
            difficulty_level, cook_time_minutes, source_quality_score, created_at
     FROM recipes WHERE status = 'published'`
  ).all();
  return (rows.results || []) as unknown as {
    id: string; meal_type: string; min_age_months: number; max_age_months: number;
    suitable_seasons: string; difficulty_level: number; cook_time_minutes: number;
    source_quality_score: number; created_at: string;
  }[];
}
