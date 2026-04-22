'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { calculateAgeMonths, formatBabyAge, isEligibleForRecipes } from '@/lib/utils/age';
import { getCurrentSeason } from '@/lib/utils/season';
import { getAgeGroup } from '@/types';

export function useBabyAge() {
  const { settings } = useSettings();
  const birthDate = settings.babyBirthDate;

  if (!birthDate) {
    return {
      ageMonths: 0,
      ageText: '请先设置宝宝出生日期',
      isEligible: false,
      ageGroup: '12-18' as const,
      season: getCurrentSeason(),
      hasBirthDate: false,
    };
  }

  const ageMonths = calculateAgeMonths(birthDate);
  return {
    ageMonths,
    ageText: formatBabyAge(birthDate),
    isEligible: isEligibleForRecipes(birthDate),
    ageGroup: getAgeGroup(Math.max(ageMonths, 12)),
    season: getCurrentSeason(),
    hasBirthDate: true,
  };
}
