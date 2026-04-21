'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PlaceCard } from '@/components/cards/PlaceCard';
import { ItineraryCard } from '@/components/cards/ItineraryCard';
import { PlaceholderImage } from '@/components/shared/PlaceholderImage';
import { useApp } from '@/context/AppContext';
import { HANGZHOU_PLACES } from '@/data/places';
import { HANGZHOU_ITINERARIES } from '@/data/itineraries';
import { MONTHLY_RECOMMENDATIONS } from '@/data/monthly';
import { scorePlaces, scoreItineraries } from '@/lib/recommendation/engine';
import { formatBabyAge, getAgeRangeLabel } from '@/lib/utils';
import type { ScoredPlace, ScoredItinerary } from '@/types';

export default function MonthlyPage() {
  const { preferences, babyAgeMonths, location } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  const months = MONTHLY_RECOMMENDATIONS;

  const scoredPlaces = useMemo(
    () => scorePlaces(HANGZHOU_PLACES, babyAgeMonths, location.lat, location.lng, preferences.districtId),
    [babyAgeMonths, location.lat, location.lng, preferences.districtId]
  );

  const scoredItineraries = useMemo(
    () => scoreItineraries(HANGZHOU_ITINERARIES, babyAgeMonths, location.lat, location.lng, preferences.districtId),
    [babyAgeMonths, location.lat, location.lng, preferences.districtId]
  );

  const currentMonth = months[activeTab];
  if (!currentMonth) return null;

  const monthPlaces: ScoredPlace[] = currentMonth.recommendedPlaceIds
    .map(id => scoredPlaces.find(p => p.id === id))
    .filter((p): p is ScoredPlace => !!p);

  const monthItineraries: ScoredItinerary[] = currentMonth.recommendedItineraryIds
    .map(id => scoredItineraries.find(i => i.id === id))
    .filter((i): i is ScoredItinerary => !!i);

  const ageRange = getAgeRangeLabel(babyAgeMonths);

  const monthGradients = [
    'from-blue-400 to-cyan-500',
    'from-green-400 to-emerald-500',
    'from-orange-400 to-red-400',
    'from-purple-400 to-pink-500',
  ];

  return (
    <div className="px-4 pt-4 space-y-4">
      {/* 顶部 */}
      <div className="flex items-center gap-3">
        <Link href="/" className="p-1.5 -ml-1.5 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">月度推荐计划</h1>
          <p className="text-xs text-gray-500">宝宝{formatBabyAge(preferences.babyBirthDate)}（{ageRange}）</p>
        </div>
      </div>

      {/* 月份 Tab */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {months.map((m, idx) => (
          <button
            key={m.monthKey}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === idx
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/70 text-gray-600 border border-gray-200'
            }`}
          >
            {m.month}月
          </button>
        ))}
      </div>

      {/* 月度主题卡片 */}
      <div className={`bg-gradient-to-br ${monthGradients[activeTab % monthGradients.length]} rounded-3xl p-5 text-white shadow-sm`}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 opacity-80" />
          <span className="text-sm font-medium opacity-80">{currentMonth.year}年{currentMonth.month}月</span>
        </div>
        <h2 className="text-xl font-bold mb-2">{currentMonth.theme}</h2>
        <p className="text-sm opacity-90 leading-relaxed">{currentMonth.themeDescription}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {currentMonth.seasonalTips.map((tip, i) => (
            <span key={i} className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{tip}</span>
          ))}
        </div>
      </div>

      {/* 推荐地点 - 横滚 */}
      {monthPlaces.length > 0 && (
        <section>
          <h3 className="font-bold text-base text-gray-900 mb-3">{currentMonth.month}月推荐地点</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
            {monthPlaces.map(place => (
              <PlaceCard key={place.id} place={place} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* 推荐线路 */}
      {monthItineraries.length > 0 && (
        <section>
          <h3 className="font-bold text-base text-gray-900 mb-3">{currentMonth.month}月推荐线路</h3>
          <div className="space-y-3">
            {monthItineraries.map(itin => (
              <ItineraryCard key={itin.id} itinerary={itin} />
            ))}
          </div>
        </section>
      )}

      {monthPlaces.length === 0 && monthItineraries.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">该月暂无推荐数据</p>
        </div>
      )}
    </div>
  );
}
