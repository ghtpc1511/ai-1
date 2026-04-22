import { getDB } from '../cloudflare';
import type { Recipe, RecipeFilters, MealType, Ingredient, RecipeStep } from '@/types';

function rowToRecipe(row: Record<string, unknown>): Recipe {
  return {
    id: row.id as string,
    name: row.name as string,
    mealType: row.meal_type as MealType,
    minAgeMonths: row.min_age_months as number,
    maxAgeMonths: row.max_age_months as number,
    suitableSeasons: JSON.parse((row.suitable_seasons as string) || '["spring","summer","autumn","winter"]'),
    suitableMonths: row.suitable_months ? JSON.parse(row.suitable_months as string) : undefined,
    difficultyLevel: row.difficulty_level as 1 | 2 | 3,
    cookTimeMinutes: row.cook_time_minutes as number,
    estimatedPriceText: (row.estimated_price_text as string) || '约5元',
    summaryText: (row.summary_text as string) || '',
    coverImage: (row.cover_image as string) || '/placeholder.svg',
    ingredientList: JSON.parse((row.ingredient_list as string) || '[]'),
    stepList: JSON.parse((row.step_list as string) || '[]'),
    tips: JSON.parse((row.tips as string) || '[]'),
    sourcePlatform: row.source_platform as Recipe['sourcePlatform'],
    sourceTitle: row.source_title as string | undefined,
    sourceUrl: row.source_url as string | undefined,
    sourcePublishedAt: row.source_published_at as string | undefined,
    normalizedSourceId: row.normalized_source_id as string | undefined,
    sourceQualityScore: (row.source_quality_score as number) || 0.8,
    recommendationScore: (row.recommendation_score as number) || 0,
    tags: JSON.parse((row.tags as string) || '[]'),
    status: row.status as Recipe['status'],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const db = await getDB();
  const row = await db.prepare('SELECT * FROM recipes WHERE id = ? AND status = ?').bind(id, 'published').first();
  if (!row) return null;
  return rowToRecipe(row);
}

export async function getRecipes(
  filters: RecipeFilters = {},
  page = 1,
  pageSize = 20
): Promise<{ recipes: Recipe[]; total: number }> {
  const db = await getDB();
  const conditions: string[] = ["status = 'published'"];
  const params: unknown[] = [];

  if (filters.mealType) {
    conditions.push('meal_type = ?');
    params.push(filters.mealType);
  }
  if (filters.difficulty) {
    conditions.push('difficulty_level = ?');
    params.push(filters.difficulty);
  }
  if (filters.maxCookTime) {
    conditions.push('cook_time_minutes <= ?');
    params.push(filters.maxCookTime);
  }
  if (filters.sourcePlatform) {
    conditions.push('source_platform = ?');
    params.push(filters.sourcePlatform);
  }
  if (filters.ageMonths) {
    conditions.push('min_age_months <= ? AND max_age_months >= ?');
    params.push(filters.ageMonths, filters.ageMonths);
  }

  const where = conditions.join(' AND ');
  const countResult = await db.prepare(`SELECT COUNT(*) as cnt FROM recipes WHERE ${where}`).bind(...params).first();
  const total = (countResult?.cnt as number) || 0;

  const offset = (page - 1) * pageSize;
  const rows = await db.prepare(
    `SELECT * FROM recipes WHERE ${where} ORDER BY recommendation_score DESC, created_at DESC LIMIT ? OFFSET ?`
  ).bind(...params, pageSize, offset).all();

  return {
    recipes: (rows.results || []).map(rowToRecipe),
    total,
  };
}

export async function getRecipesByIds(ids: string[]): Promise<Recipe[]> {
  if (ids.length === 0) return [];
  const db = await getDB();
  const placeholders = ids.map(() => '?').join(',');
  const rows = await db.prepare(
    `SELECT * FROM recipes WHERE id IN (${placeholders}) AND status = 'published'`
  ).bind(...ids).all();
  return (rows.results || []).map(rowToRecipe);
}

export async function getRecipeCount(): Promise<number> {
  const db = await getDB();
  const r = await db.prepare("SELECT COUNT(*) as cnt FROM recipes WHERE status = 'published'").first();
  return (r?.cnt as number) || 0;
}

export async function insertRecipe(recipe: Recipe): Promise<void> {
  const db = await getDB();
  await db.prepare(`
    INSERT OR IGNORE INTO recipes (
      id, name, meal_type, min_age_months, max_age_months,
      suitable_seasons, suitable_months, difficulty_level, cook_time_minutes,
      estimated_price_text, summary_text, cover_image,
      ingredient_list, step_list, tips,
      source_platform, source_title, source_url, source_published_at,
      normalized_source_id, source_quality_score, recommendation_score,
      tags, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    recipe.id, recipe.name, recipe.mealType,
    recipe.minAgeMonths, recipe.maxAgeMonths,
    JSON.stringify(recipe.suitableSeasons),
    recipe.suitableMonths ? JSON.stringify(recipe.suitableMonths) : null,
    recipe.difficultyLevel, recipe.cookTimeMinutes,
    recipe.estimatedPriceText, recipe.summaryText, recipe.coverImage,
    JSON.stringify(recipe.ingredientList), JSON.stringify(recipe.stepList),
    JSON.stringify(recipe.tips),
    recipe.sourcePlatform, recipe.sourceTitle || null,
    recipe.sourceUrl || null, recipe.sourcePublishedAt || null,
    recipe.normalizedSourceId || null, recipe.sourceQualityScore,
    recipe.recommendationScore,
    JSON.stringify(recipe.tags), recipe.status,
    recipe.createdAt, recipe.updatedAt
  ).run();
}

export async function updateRecipeScore(id: string, score: number): Promise<void> {
  const db = await getDB();
  await db.prepare(
    "UPDATE recipes SET recommendation_score = ?, updated_at = datetime('now') WHERE id = ?"
  ).bind(score, id).run();
}
