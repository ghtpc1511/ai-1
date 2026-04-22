-- Baby Recipe Database Schema
-- migrations/0001_schema.sql

-- 食谱主表
CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  meal_type TEXT NOT NULL CHECK(meal_type IN ('breakfast', 'lunch', 'dinner')),
  min_age_months INTEGER NOT NULL DEFAULT 12,
  max_age_months INTEGER NOT NULL DEFAULT 72,
  suitable_seasons TEXT DEFAULT '["spring","summer","autumn","winter"]',
  suitable_months TEXT,
  difficulty_level INTEGER NOT NULL DEFAULT 1 CHECK(difficulty_level BETWEEN 1 AND 3),
  cook_time_minutes INTEGER NOT NULL DEFAULT 15,
  estimated_price_text TEXT DEFAULT '约5元',
  summary_text TEXT,
  cover_image TEXT DEFAULT '/placeholder.svg',
  ingredient_list TEXT NOT NULL DEFAULT '[]',
  step_list TEXT NOT NULL DEFAULT '[]',
  tips TEXT DEFAULT '[]',
  source_platform TEXT DEFAULT 'system' CHECK(source_platform IN ('xiaohongshu', 'douyin', 'kuaishou', 'system', 'ai_generated')),
  source_title TEXT,
  source_url TEXT,
  source_published_at TEXT,
  normalized_source_id TEXT,
  source_quality_score REAL DEFAULT 0.8,
  recommendation_score REAL DEFAULT 0,
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'published' CHECK(status IN ('published', 'draft', 'archived')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_recipes_meal_type ON recipes(meal_type, status);
CREATE INDEX IF NOT EXISTS idx_recipes_age ON recipes(min_age_months, max_age_months, status);
CREATE INDEX IF NOT EXISTS idx_recipes_score ON recipes(recommendation_score DESC);
CREATE INDEX IF NOT EXISTS idx_recipes_status ON recipes(status, created_at DESC);

-- 推荐缓存表
CREATE TABLE IF NOT EXISTS recommendations (
  id TEXT PRIMARY KEY,
  recipe_id TEXT NOT NULL,
  age_group TEXT NOT NULL,
  season TEXT NOT NULL CHECK(season IN ('spring', 'summer', 'autumn', 'winter')),
  meal_type TEXT NOT NULL CHECK(meal_type IN ('breakfast', 'lunch', 'dinner')),
  score REAL NOT NULL DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  feed_rank INTEGER,
  reason TEXT,
  computed_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_rec_age_season ON recommendations(age_group, season, meal_type, score DESC);
CREATE INDEX IF NOT EXISTS idx_rec_featured ON recommendations(is_featured, age_group, season);
CREATE UNIQUE INDEX IF NOT EXISTS idx_rec_unique ON recommendations(recipe_id, age_group, season, meal_type);

-- 成长知识表
CREATE TABLE IF NOT EXISTS growth_knowledge (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK(category IN ('height_weight', 'feeding_notes', 'forbidden_foods')),
  gender TEXT NOT NULL CHECK(gender IN ('male', 'female', 'all')),
  min_age_months INTEGER NOT NULL,
  max_age_months INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_growth_cat ON growth_knowledge(category, gender, min_age_months);

-- 更新日志表
CREATE TABLE IF NOT EXISTS update_logs (
  id TEXT PRIMARY KEY,
  task_type TEXT NOT NULL CHECK(task_type IN ('fetch', 'generate', 'recommend', 'cache')),
  status TEXT NOT NULL CHECK(status IN ('success', 'failed', 'running')),
  message TEXT,
  recipes_added INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_logs_type ON update_logs(task_type, created_at DESC);
