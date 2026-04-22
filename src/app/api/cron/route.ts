import { NextRequest, NextResponse } from 'next/server';
import { computeRecommendations } from '@/lib/recommendation/scorer';
import { generateRecipes } from '@/lib/ai/generator';
import { getCurrentSeason } from '@/lib/utils/season';
import { getRecipeCount } from '@/lib/db/recipes';
import { getEnv } from '@/lib/cloudflare';
import { AGE_GROUPS, type MealType, type AgeGroup } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const env = await getEnv();
    const authHeader = request.headers.get('authorization');
    const cronSecret = env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'all';
    const season = getCurrentSeason();

    const results: Record<string, unknown> = {};

    // Action: generate new recipes via AI
    if (action === 'generate' || action === 'all') {
      if (env.ENABLE_AUTO_UPDATE !== 'true') {
        results.generate = 'Auto-update disabled';
      } else {
        const totalRecipes = await getRecipeCount();
        let generated = 0;

        // Only generate if we have fewer than 60 recipes
        if (totalRecipes < 60) {
          const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];
          // Generate for a subset of age groups to stay within API limits
          const targetGroups: AgeGroup[] = ['12-18', '25-36', '49-72'];

          for (const ag of targetGroups) {
            for (const mt of mealTypes) {
              try {
                const recipes = await generateRecipes(mt, season, ag, 2);
                generated += recipes.length;
              } catch (e) {
                console.error(`Generation failed for ${ag}/${mt}:`, e);
              }
            }
          }
        }

        results.generate = { recipesGenerated: generated, totalRecipes };
      }
    }

    // Action: recompute recommendation scores
    if (action === 'recommend' || action === 'all') {
      const { featured, feed } = await computeRecommendations(season);
      results.recommend = { featured, feed };
    }

    return NextResponse.json({ ok: true, season, results });
  } catch (error) {
    console.error('POST /api/cron error:', error);
    return NextResponse.json({ error: 'Cron task failed' }, { status: 500 });
  }
}
