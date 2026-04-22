import { getDB } from '../cloudflare';
import type { GrowthKnowledge, GrowthCategory } from '@/types';

function rowToGrowthKnowledge(row: Record<string, unknown>): GrowthKnowledge {
  return {
    id: row.id as string,
    category: row.category as GrowthCategory,
    gender: row.gender as 'male' | 'female' | 'all',
    minAgeMonths: row.min_age_months as number,
    maxAgeMonths: row.max_age_months as number,
    title: row.title as string,
    content: row.content as string,
    sortOrder: (row.sort_order as number) || 0,
  };
}

export async function getGrowthKnowledge(
  category: GrowthCategory,
  gender: 'male' | 'female'
): Promise<GrowthKnowledge[]> {
  const db = await getDB();
  const rows = await db.prepare(
    `SELECT * FROM growth_knowledge
     WHERE category = ? AND (gender = ? OR gender = 'all')
     ORDER BY min_age_months ASC, sort_order ASC`
  ).bind(category, gender).all();
  return (rows.results || []).map(rowToGrowthKnowledge);
}

export async function getAllGrowthKnowledge(
  gender: 'male' | 'female'
): Promise<Record<GrowthCategory, GrowthKnowledge[]>> {
  const [hw, fn, ff] = await Promise.all([
    getGrowthKnowledge('height_weight', gender),
    getGrowthKnowledge('feeding_notes', gender),
    getGrowthKnowledge('forbidden_foods', gender),
  ]);
  return {
    height_weight: hw,
    feeding_notes: fn,
    forbidden_foods: ff,
  };
}
