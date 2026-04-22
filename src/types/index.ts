// TypeScript types for the baby recipe app

// ============ Recipe Types ============

export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type DifficultyLevel = 1 | 2 | 3;
export type SourcePlatform = 'xiaohongshu' | 'douyin' | 'kuaishou' | 'system' | 'ai_generated';
export type RecipeStatus = 'published' | 'draft' | 'archived';
export type Gender = 'male' | 'female';
export type GrowthCategory = 'height_weight' | 'feeding_notes' | 'forbidden_foods';

export interface RecipeStep {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  stepImage: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  category?: string;
  isOptional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  mealType: MealType;
  minAgeMonths: number;
  maxAgeMonths: number;
  suitableSeasons: Season[];
  suitableMonths?: number[];
  difficultyLevel: DifficultyLevel;
  cookTimeMinutes: number;
  estimatedPriceText: string;
  summaryText: string;
  coverImage: string;
  ingredientList: Ingredient[];
  stepList: RecipeStep[];
  tips: string[];
  sourcePlatform: SourcePlatform;
  sourceTitle?: string;
  sourceUrl?: string;
  sourcePublishedAt?: string;
  normalizedSourceId?: string;
  sourceQualityScore: number;
  recommendationScore: number;
  tags: string[];
  status: RecipeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeFeedItem {
  id: string;
  recipeId: string;
  recipe: Recipe;
  isFeatured: boolean;
  feedRank: number;
  reason: string;
  computedAt: string;
}

// ============ User Preferences ============

export interface UserPreferences {
  babyBirthDate: string | null; // ISO date string
  babyGender: Gender;
  province: string;
  city: string;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  babyBirthDate: null,
  babyGender: 'male',
  province: '浙江省',
  city: '杭州市',
};

// ============ Growth Knowledge ============

export interface GrowthKnowledge {
  id: string;
  category: GrowthCategory;
  gender: 'male' | 'female' | 'all';
  minAgeMonths: number;
  maxAgeMonths: number;
  title: string;
  content: string;
  sortOrder: number;
}

// ============ API Types ============

export interface RecommendationsResponse {
  featured: Record<MealType, Recipe[]>;
  season: Season;
  ageGroup: string;
  babyAgeMonths: number;
}

export interface FeedResponse {
  items: RecipeFeedItem[];
  total: number;
  hasMore: boolean;
  page: number;
}

export interface RecipeListResponse {
  recipes: Recipe[];
  total: number;
  page: number;
  pageSize: number;
}

export interface RecipeFilters {
  mealType?: MealType;
  difficulty?: DifficultyLevel;
  maxCookTime?: number;
  sourcePlatform?: SourcePlatform;
  ageMonths?: number;
  season?: Season;
}

// ============ Age Group ============

export type AgeGroup = '12-18' | '19-24' | '25-36' | '37-48' | '49-72';

export const AGE_GROUPS: { key: AgeGroup; label: string; min: number; max: number }[] = [
  { key: '12-18', label: '12-18个月', min: 12, max: 18 },
  { key: '19-24', label: '19-24个月', min: 19, max: 24 },
  { key: '25-36', label: '2-3岁', min: 25, max: 36 },
  { key: '37-48', label: '3-4岁', min: 37, max: 48 },
  { key: '49-72', label: '4-6岁', min: 49, max: 72 },
];

export function getAgeGroup(ageMonths: number): AgeGroup {
  if (ageMonths <= 18) return '12-18';
  if (ageMonths <= 24) return '19-24';
  if (ageMonths <= 36) return '25-36';
  if (ageMonths <= 48) return '37-48';
  return '49-72';
}

// ============ Meal Type Labels ============

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: '早餐',
  lunch: '午饭',
  dinner: '晚饭',
};

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  1: '简单',
  2: '中等偏简单',
  3: '普通',
};

export const SEASON_LABELS: Record<Season, string> = {
  spring: '春季',
  summer: '夏季',
  autumn: '秋季',
  winter: '冬季',
};

export const SOURCE_LABELS: Record<SourcePlatform, string> = {
  xiaohongshu: '小红书',
  douyin: '抖音',
  kuaishou: '快手',
  system: '精选',
  ai_generated: 'AI推荐',
};
