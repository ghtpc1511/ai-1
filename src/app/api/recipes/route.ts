import { NextRequest, NextResponse } from 'next/server';
import { getRecipes } from '@/lib/db/recipes';
import type { RecipeFilters, MealType, DifficultyLevel, SourcePlatform } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    const filters: RecipeFilters = {};

    const mealType = searchParams.get('mealType');
    if (mealType) filters.mealType = mealType as MealType;

    const difficulty = searchParams.get('difficulty');
    if (difficulty) filters.difficulty = parseInt(difficulty, 10) as DifficultyLevel;

    const maxCookTime = searchParams.get('maxCookTime');
    if (maxCookTime) filters.maxCookTime = parseInt(maxCookTime, 10);

    const sourcePlatform = searchParams.get('sourcePlatform');
    if (sourcePlatform) filters.sourcePlatform = sourcePlatform as SourcePlatform;

    const ageMonths = searchParams.get('ageMonths');
    if (ageMonths) filters.ageMonths = parseInt(ageMonths, 10);

    const { recipes, total } = await getRecipes(filters, page, pageSize);

    return NextResponse.json({ recipes, total, page, pageSize });
  } catch (error) {
    console.error('GET /api/recipes error:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}
