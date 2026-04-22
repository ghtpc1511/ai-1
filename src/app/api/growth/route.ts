import { NextRequest, NextResponse } from 'next/server';
import { getAllGrowthKnowledge } from '@/lib/db/growth';
import { getCached, setCache, growthKey } from '@/lib/cache/kv';
import type { GrowthCategory, GrowthKnowledge } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gender = (searchParams.get('gender') || 'male') as 'male' | 'female';

    // Try cache
    const cKey = growthKey('all', gender);
    const cached = await getCached<Record<GrowthCategory, GrowthKnowledge[]>>(cKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const data = await getAllGrowthKnowledge(gender);

    // Cache for 7 days
    await setCache(cKey, data, 604800);

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/growth error:', error);
    return NextResponse.json({ error: 'Failed to fetch growth knowledge' }, { status: 500 });
  }
}
