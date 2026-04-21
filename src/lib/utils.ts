import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInMonths, differenceInYears } from 'date-fns';
import { AGE_RANGES, type Season } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================================
// 宝宝月龄计算
// ============================================================
export function calculateBabyAgeMonths(birthDate: string): number {
  const birth = new Date(birthDate);
  const now = new Date();
  return differenceInMonths(now, birth);
}

export function formatBabyAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  const totalMonths = differenceInMonths(now, birth);
  const years = differenceInYears(now, birth);
  const months = totalMonths - years * 12;

  if (totalMonths < 0) return '未出生';
  if (years === 0) return `${totalMonths}个月`;
  if (months === 0) return `${years}岁`;
  return `${years}岁${months}个月`;
}

export function getAgeRangeLabel(months: number): string {
  for (const range of AGE_RANGES) {
    if (months >= range.minMonths && months <= range.maxMonths) {
      return range.label;
    }
  }
  return '3岁以上';
}

// ============================================================
// 季节判断
// ============================================================
export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'SPRING';
  if (month >= 6 && month <= 8) return 'SUMMER';
  if (month >= 9 && month <= 11) return 'AUTUMN';
  return 'WINTER';
}

export function getSeasonLabel(season: Season): string {
  const map: Record<Season, string> = {
    SPRING: '春季',
    SUMMER: '夏季',
    AUTUMN: '秋季',
    WINTER: '冬季',
  };
  return map[season];
}

export function getMonthSeason(month: number): Season {
  if (month >= 3 && month <= 5) return 'SPRING';
  if (month >= 6 && month <= 8) return 'SUMMER';
  if (month >= 9 && month <= 11) return 'AUTUMN';
  return 'WINTER';
}

// ============================================================
// Haversine 距离计算（公里）
// ============================================================
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// ============================================================
// 占位图颜色生成
// ============================================================
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export type PlaceCategoryForColor = 'PARK' | 'MALL' | 'MUSEUM' | 'INDOOR_PLAY' | 'SCENIC' | 'CAFE' | 'LIBRARY';

const CATEGORY_GRADIENTS: Record<PlaceCategoryForColor, string[]> = {
  PARK: ['from-green-400 to-emerald-600', 'from-emerald-400 to-teal-600', 'from-lime-400 to-green-600'],
  MUSEUM: ['from-amber-400 to-orange-600', 'from-orange-400 to-red-500', 'from-yellow-500 to-amber-600'],
  MALL: ['from-blue-400 to-indigo-600', 'from-sky-400 to-blue-600', 'from-indigo-400 to-purple-600'],
  INDOOR_PLAY: ['from-pink-400 to-rose-600', 'from-fuchsia-400 to-pink-600', 'from-rose-400 to-red-500'],
  SCENIC: ['from-cyan-400 to-blue-600', 'from-teal-400 to-cyan-600', 'from-sky-400 to-indigo-500'],
  CAFE: ['from-yellow-400 to-amber-500', 'from-orange-300 to-yellow-500', 'from-amber-300 to-orange-500'],
  LIBRARY: ['from-violet-400 to-purple-600', 'from-purple-400 to-indigo-600', 'from-indigo-400 to-violet-600'],
};

const CATEGORY_EMOJIS: Record<PlaceCategoryForColor, string> = {
  PARK: '🌳',
  MUSEUM: '🏛️',
  MALL: '🏬',
  INDOOR_PLAY: '🎠',
  SCENIC: '🏞️',
  CAFE: '☕',
  LIBRARY: '📚',
};

export function getCategoryGradient(category: PlaceCategoryForColor, colorSeed: string): string {
  const gradients = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.SCENIC;
  const idx = hashString(colorSeed) % gradients.length;
  return gradients[idx];
}

export function getCategoryEmoji(category: PlaceCategoryForColor): string {
  return CATEGORY_EMOJIS[category] || '📍';
}

// ============================================================
// 周日期范围
// ============================================================
export function getWeekRange(): { start: Date; end: Date; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;
  return { start: monday, end: sunday, label: `${fmt(monday)} - ${fmt(sunday)}` };
}

// ============================================================
// 格式化
// ============================================================
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

export function formatMonth(month: number): string {
  return `${month}月`;
}

export function getMonthLabel(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}
