interface CloudflareEnv {
  DB: D1Database;
  BUCKET: R2Bucket;
  CACHE: KVNamespace;
  QWEN_API_BASE_URL: string;
  QWEN_API_KEY: string;
  QWEN_MODEL_NAME: string;
  DEFAULT_PROVINCE: string;
  DEFAULT_CITY: string;
  ENABLE_XHS_SOURCE: string;
  ENABLE_DOUYIN_SOURCE: string;
  ENABLE_KUAISHOU_SOURCE: string;
  FEED_MAX_ITEMS: string;
  ENABLE_AUTO_UPDATE: string;
  UPDATE_SCHEDULE: string;
  CRON_SECRET: string;
  R2_PUBLIC_URL: string;
}

declare global {
  interface ProcessEnv extends CloudflareEnv {}
}

export type { CloudflareEnv };
