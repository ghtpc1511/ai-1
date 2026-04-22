import type { Season } from '@/types';

/**
 * Calculate baby age in months from birth date
 */
export function calculateAgeMonths(birthDate: string): number {
  const birth = new Date(birthDate);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  const dayDiff = now.getDate() - birth.getDate();
  return dayDiff < 0 ? Math.max(0, months - 1) : months;
}

/**
 * Calculate baby age in days from birth date
 */
export function calculateAgeDays(birthDate: string): number {
  const birth = new Date(birthDate);
  const now = new Date();
  return Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Format baby age as human readable string
 */
export function formatBabyAge(birthDate: string): string {
  const totalDays = calculateAgeDays(birthDate);
  if (totalDays < 0) return '还未出生';

  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears % 30;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years}岁`);
  if (months > 0) parts.push(`${months}个月`);
  if (days > 0 && years === 0) parts.push(`${days}天`);

  return parts.length > 0 ? parts.join('') : '刚出生';
}

/**
 * Check if baby age is eligible for recipe recommendations (>= 12 months)
 */
export function isEligibleForRecipes(birthDate: string): boolean {
  return calculateAgeMonths(birthDate) >= 12;
}
