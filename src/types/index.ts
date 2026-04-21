// ============================================================
// 核心类型定义 - 宝宝出行推荐网站
// ============================================================

export type PlaceCategory = 'PARK' | 'MALL' | 'MUSEUM' | 'INDOOR_PLAY' | 'SCENIC' | 'CAFE' | 'LIBRARY';
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type Weather = 'SUNNY' | 'CLOUDY' | 'RAINY' | 'HOT' | 'COLD';
export type IndoorOutdoor = 'INDOOR' | 'OUTDOOR' | 'BOTH';
export type DurationType = 'HALF_DAY' | 'FULL_DAY';
export type UpdateFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'MANUAL';

// ============================================================
// 用户偏好
// ============================================================
export interface UserPreferences {
  babyBirthDate: string;       // ISO 日期 "2024-09-13"
  cityId: string;              // 默认 "hangzhou"
  districtId: string | null;
  useGeolocation: boolean;
  lastKnownLat: number | null;
  lastKnownLng: number | null;
  updateFrequency: UpdateFrequency;
  lastUpdatedAt: string;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  babyBirthDate: '2024-09-13',
  cityId: 'hangzhou',
  districtId: null,
  useGeolocation: true,
  updateFrequency: 'WEEKLY',
  lastUpdatedAt: new Date().toISOString(),
  lastKnownLat: null,
  lastKnownLng: null,
};

// ============================================================
// 地点
// ============================================================
export interface Place {
  id: string;
  name: string;
  cityId: string;
  districtId: string;
  districtName: string;
  category: PlaceCategory;
  tags: string[];

  // 位置
  lat: number;
  lng: number;
  address: string;

  // 描述
  description: string;
  shortDesc: string;           // 卡片摘要（50字内）
  highlights: string[];        // 亮点
  tips: string[];              // 避坑/注意事项
  playTips: string[];          // 玩法建议

  // 开放时间
  openHours: string;
  closedDays: string[];

  // 定价
  isFree: boolean;
  priceText: string;           // "免费" 或 "成人50元/儿童免费"
  priceUpdatedAt: string;
  priceSource: string;
  priceNotes: string;
  needReservation: boolean;
  hiddenCosts: string;         // 停车费等隐性费用

  // 适龄
  minAgeMonths: number;
  maxAgeMonths: number;
  ageNote: string;

  // 设施
  hasNursingRoom: boolean;
  hasRestroom: boolean;
  hasRestArea: boolean;
  strollerFriendly: boolean;
  elderFriendly: boolean;
  rainFriendly: boolean;

  // 环境
  indoorOutdoor: IndoorOutdoor;
  durationSuggestion: number;  // 建议游玩时长（分钟）
  bestVisitMonths: number[];   // 最佳月份 1-12
  suitableSeasons: Season[];
  suitableWeather: Weather[];

  // 交通
  transportInfo: string;
  parkingInfo: string;

  // 图片 (colorSeed 用于生成占位图)
  colorSeed: string;
  coverImage: string;          // 占位图URL或留空

  // 元数据
  popularity: number;          // 1-100
  updatedAt: string;

  // 公开信息参考（可选）
  publicInfoRefs?: {
    label: string;             // "官方公众号" / "小红书搜索"
    value: string;             // 具体内容
  }[];
}

// ============================================================
// 行程路线
// ============================================================
export interface ItineraryStop {
  order: number;
  type: 'PLACE' | 'MEAL' | 'REST' | 'TRANSPORT';
  placeId?: string;
  placeName: string;
  startTime: string;           // "09:00"
  endTime: string;
  duration: number;            // 分钟
  description: string;
  tips: string;
  colorSeed: string;
  transportToNext?: {
    mode: 'WALK' | 'METRO' | 'BUS' | 'TAXI' | 'DRIVE';
    duration: number;
    distance: string;
    note: string;
  };
}

export interface Itinerary {
  id: string;
  name: string;
  subtitle: string;
  cityId: string;
  districtId: string;
  districtName: string;
  durationType: DurationType;
  totalDuration: string;       // "约4小时"
  budgetText: string;          // "约100-200元"
  colorSeed: string;
  coverImage: string;

  // 适龄
  minAgeMonths: number;
  maxAgeMonths: number;

  // 友好度
  strollerFriendly: boolean;
  elderFriendly: boolean;
  rainFriendly: boolean;

  // 推荐逻辑
  suitableSeasons: Season[];
  tags: string[];
  routeHighlights: string[];
  routeTips: string[];

  // 行程节点
  stops: ItineraryStop[];

  // 元数据
  popularity: number;
  updatedAt: string;
  summaryText: string;
}

// ============================================================
// 月度推荐
// ============================================================
export interface MonthlyRecommendation {
  monthKey: string;            // "2026-05"
  month: number;               // 5
  year: number;
  cityId: string;
  theme: string;               // "初夏亲子·西湖荷花开"
  themeDescription: string;
  colorSeed: string;
  suitableAgeRanges: string[];
  recommendedPlaceIds: string[];
  recommendedItineraryIds: string[];
  seasonalTips: string[];
  notes: string;
  updatedAt: string;
}

// ============================================================
// 推荐评分
// ============================================================
export interface ScoreBreakdown {
  ageScore: number;            // 0-30
  seasonScore: number;         // 0-20
  distanceScore: number;       // 0-20
  popularityScore: number;     // 0-15
  accessibilityScore: number;  // 0-15
  total: number;               // 0-100
}

export interface ScoredPlace extends Place {
  score: number;
  scoreBreakdown: ScoreBreakdown;
  distanceKm?: number;
}

export interface ScoredItinerary extends Itinerary {
  score: number;
  scoreBreakdown: ScoreBreakdown;
}

// ============================================================
// 行政区
// ============================================================
export interface District {
  id: string;
  name: string;
  cityId: string;
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
  districts: District[];
}

// ============================================================
// 年龄段
// ============================================================
export interface AgeRange {
  label: string;
  minMonths: number;
  maxMonths: number;
}

export const AGE_RANGES: AgeRange[] = [
  { label: '0-3个月', minMonths: 0, maxMonths: 3 },
  { label: '4-6个月', minMonths: 4, maxMonths: 6 },
  { label: '7-9个月', minMonths: 7, maxMonths: 9 },
  { label: '10-12个月', minMonths: 10, maxMonths: 12 },
  { label: '13-18个月', minMonths: 13, maxMonths: 18 },
  { label: '19-24个月', minMonths: 19, maxMonths: 24 },
  { label: '2-3岁', minMonths: 25, maxMonths: 36 },
  { label: '3岁以上', minMonths: 37, maxMonths: 999 },
];
