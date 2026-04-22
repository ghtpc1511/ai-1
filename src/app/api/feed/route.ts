import { NextRequest, NextResponse } from 'next/server';
import { getFeedRecipeIds } from '@/lib/db/recommendations';
import { getRecipesByIds, getRecipes } from '@/lib/db/recipes';
import { getCached, setCache, feedKey } from '@/lib/cache/kv';
import { getCurrentSeason } from '@/lib/utils/season';
import { getAgeGroup, type FeedResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ageMonths = parseInt(searchParams.get('ageMonths') || '18', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const ageGroup = getAgeGroup(ageMonths);
    const season = getCurrentSeason();

    // Try cache
    const cKey = feedKey(ageGroup, season, page);
    const cached = await getCached<FeedResponse>(cKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    let { ids, total } = await getFeedRecipeIds(ageGroup, season, page, pageSize);
    let recipes = ids.length > 0 ? await getRecipesByIds(ids) : [];

    // Fallback: if no recommendations, query DB directly
    if (recipes.length === 0) {
      const result = await getRecipes({ ageMonths }, page, pageSize);
      recipes = result.recipes;
      total = Math.min(result.total, 20); // hard cap 20
    }

    const response: FeedResponse = {
      items: recipes.map((r, i) => ({
        id: `feed-${r.id}`,
        recipeId: r.id,
        recipe: r,
        isFeatured: false,
        feedRank: (page - 1) * pageSize + i + 1,
        reason: '更多好菜推荐',
        computedAt: new Date().toISOString(),
      })),
      total: Math.min(total, 20),
      hasMore: page * pageSize < Math.min(total, 20),
      page,
    };

    await setCache(cKey, response, 21600);

    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/feed error:', error);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}
