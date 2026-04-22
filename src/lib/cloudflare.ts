import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareEnv } from "../../env.d.ts";

export async function getEnv(): Promise<CloudflareEnv> {
  const ctx = await getCloudflareContext();
  return ctx.env as unknown as CloudflareEnv;
}

export async function getDB(): Promise<D1Database> {
  const env = await getEnv();
  return env.DB;
}

export async function getKV(): Promise<KVNamespace> {
  const env = await getEnv();
  return env.CACHE;
}

export async function getR2(): Promise<R2Bucket> {
  const env = await getEnv();
  return env.BUCKET;
}
