import { getKV } from '../cloudflare';

const DEFAULT_TTL = 6 * 60 * 60; // 6 hours in seconds

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const kv = await getKV();
    const val = await kv.get(key, 'text');
    if (!val) return null;
    return JSON.parse(val) as T;
  } catch {
    return null;
  }
}

export async function setCache<T>(key: string, value: T, ttlSeconds = DEFAULT_TTL): Promise<void> {
  try {
    const kv = await getKV();
    await kv.put(key, JSON.stringify(value), { expirationTtl: ttlSeconds });
  } catch {
    // silently fail - cache is optional
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    const kv = await getKV();
    await kv.delete(key);
  } catch {
    // silently fail
  }
}

export function homeRecKey(ageGroup: string, season: string): string {
  return `home:rec:${ageGroup}:${season}`;
}

export function feedKey(ageGroup: string, season: string, page: number): string {
  return `feed:${ageGroup}:${season}:${page}`;
}

export function recipeDetailKey(id: string): string {
  return `recipe:detail:${id}`;
}

export function growthKey(category: string, gender: string): string {
  return `growth:${category}:${gender}`;
}
