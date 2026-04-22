import { getR2, getEnv } from '../cloudflare';

export async function uploadImage(key: string, data: ArrayBuffer, contentType = 'image/webp'): Promise<string> {
  const r2 = await getR2();
  await r2.put(key, data, { httpMetadata: { contentType } });
  const env = await getEnv();
  const baseUrl = env.R2_PUBLIC_URL;
  return baseUrl ? `${baseUrl}/${key}` : `/api/images/${key}`;
}

export async function getImage(key: string): Promise<{ data: ArrayBuffer; contentType: string } | null> {
  const r2 = await getR2();
  const obj = await r2.get(key);
  if (!obj) return null;
  return {
    data: await obj.arrayBuffer(),
    contentType: obj.httpMetadata?.contentType || 'image/webp',
  };
}

export function getImageUrl(key: string | null, fallback = '/placeholder.svg'): string {
  if (!key) return fallback;
  if (key.startsWith('http') || key.startsWith('/')) return key;
  return fallback;
}
