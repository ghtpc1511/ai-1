import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedRecipes } from '@/lib/db/recommendations';
import { getRecipesByIds } from '@/lib/db/recipes';
import { getCached, setCache, homeRecKey } from '@/lib/cache/kv';
import { getCurrentSeason } from '@/lib/utils/season';
import { getAgeGroup, type AgeGroup, type MealType, type RecommendationsResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ageMonths = parseInt(searchParams.get('ageMonths') || '18', 10);
    const ageGroup = getAgeGroup(ageMonths);
    const season = getCurrentSeason();

    // Try cache
    const cacheKey = homeRecKey(ageGroup, season);
    const cached = await getCached<RecommendationsResponse>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];
    const featured: Record<MealType, Awaited<ReturnType<typeof getRecipesByIds>>> = {
      breakfast: [],
      lunch: [],
      dinner: [],
    };

    for (const mt of mealTypes) {
      const ids = await getFeaturedRecipes(ageGroup, season, mt, 5);
      if (ids.length > 0) {
        featured[mt] = await getRecipesByIds(ids);
      }
    }

    // If no recommendations found, fall back to direct DB query
    if (featured.breakfast.length === 0 && featured.lunch.length === 0 && featured.dinner.length === 0) {
      const { getRecipes } = await import('@/lib/db/recipes');
      for (const mt of mealTypes) {
        const { recipes } = await getRecipes({ mealType: mt, ageMonths }, 1, 5);
        featured[mt] = recipes;
      }
    }

    const response: RecommendationsResponse = {
      featured,
      season,
      ageGroup,
      babyAgeMonths: ageMonths,
    };

    await setCache(cacheKey, response, 21600); // 6h

    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/recommendations error:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}
