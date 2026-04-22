'use client';

import Link from 'next/link';
import { useSettings } from '@/contexts/SettingsContext';
import { useBabyAge } from '@/hooks/useSettings';

export default function BabyAgeCard() {
  const { settings } = useSettings();
  const { ageText, hasBirthDate, isEligible, ageMonths } = useBabyAge();

  if (!hasBirthDate) {
    return (
      <Link href="/settings" className="block">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-5 text-white shadow-lg active:scale-[0.98] transition-transform">
          <p className="text-lg font-bold">欢迎使用宝宝菜谱</p>
          <p className="text-base mt-1 opacity-90">点击这里设置宝宝出生日期</p>
          <p className="text-sm mt-2 opacity-75">设置后自动推荐适龄食谱</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">宝宝现在</p>
          <p className="text-2xl font-bold mt-0.5">{ageText}</p>
          {!isEligible && ageMonths > 0 && (
            <p className="text-sm mt-1 opacity-80">
              满12个月后开始推荐辅食食谱
            </p>
          )}
        </div>
        <div className="text-5xl opacity-80">
          {settings.babyGender === 'male' ? '👦' : '👧'}
        </div>
      </div>
    </div>
  );
}
