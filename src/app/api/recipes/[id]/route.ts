import { NextRequest, NextResponse } from 'next/server';
import { getRecipeById } from '@/lib/db/recipes';
import { getCached, setCache, recipeDetailKey } from '@/lib/cache/kv';
import type { Recipe } from '@/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try cache first
    const cacheKey = recipeDetailKey(id);
    const cached = await getCached<Recipe>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const recipe = await getRecipeById(id);
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Cache for 24 hours
    await setCache(cacheKey, recipe, 86400);

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('GET /api/recipes/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}
