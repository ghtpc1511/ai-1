'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { getCurrentSeason } from '@/lib/utils/season';
import { SEASON_LABELS } from '@/types';

export default function SeasonLocationCard() {
  const { settings } = useSettings();
  const season = getCurrentSeason();

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">
          {season === 'spring' ? '🌸' : season === 'summer' ? '☀️' : season === 'autumn' ? '🍂' : '❄️'}
        </span>
        <div>
          <p className="text-base font-bold text-gray-800">
            {settings.city || settings.province}
          </p>
          <p className="text-sm text-gray-500">{SEASON_LABELS[season]}</p>
        </div>
      </div>
      <span className="text-sm text-gray-400">本周推荐</span>
    </div>
  );
}
