'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { MapPin, CalendarDays, Map, ChevronRight, RefreshCw, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceCard } from '@/components/cards/PlaceCard';
import { ItineraryCard } from '@/components/cards/ItineraryCard';
import { useApp } from '@/context/AppContext';
import { HANGZHOU_PLACES } from '@/data/places';
import { HANGZHOU_ITINERARIES } from '@/data/itineraries';
import { scorePlaces, scoreItineraries } from '@/lib/recommendation/engine';
import { formatBabyAge, getAgeRangeLabel, getSeasonLabel, getWeekRange } from '@/lib/utils';
import { getDistrict } from '@/data/districts';
import type { Place } from '@/types';

function getUpcomingPlaces(places: Place[], babyAgeMonths: number): (Place & { monthsUntilSuitable: number })[] {
  return places
    .filter(p => babyAgeMonths < p.minAgeMonths && p.minAgeMonths - babyAgeMonths <= 3)
    .map(p => ({ ...p, monthsUntilSuitable: p.minAgeMonths - babyAgeMonths }))
    .sort((a, b) => a.monthsUntilSuitable - b.monthsUntilSuitable)
    .slice(0, 4);
}

export default function HomePage() {
  const { preferences, babyAgeMonths, currentSeason, location, triggerManualUpdate } = useApp();

  const districtName = preferences.districtId
    ? getDistrict(preferences.cityId, preferences.districtId)?.name ?? '杭州'
    : '杭州';

  const scoredPlaces = useMemo(
    () => scorePlaces(HANGZHOU_PLACES, babyAgeMonths, location.lat, location.lng, preferences.districtId),
    [babyAgeMonths, location.lat, location.lng, preferences.districtId]
  );

  const scoredItineraries = useMemo(
    () => scoreItineraries(HANGZHOU_ITINERARIES, babyAgeMonths, location.lat, location.lng, preferences.districtId),
    [babyAgeMonths, location.lat, location.lng, preferences.districtId]
  );

  const upcomingPlaces = useMemo(
    () => getUpcomingPlaces(HANGZHOU_PLACES, babyAgeMonths),
    [babyAgeMonths]
  );

  const topPlaces = scoredPlaces.slice(0, 8);
  const topItineraries = scoredItineraries.slice(0, 3);
  const babyAge = formatBabyAge(preferences.babyBirthDate);
  const ageRange = getAgeRangeLabel(babyAgeMonths);
  const weekRange = getWeekRange();

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* Hero */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-white/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{districtName}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {getSeasonLabel(currentSeason)}
          </Badge>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-2xl shadow-sm">
            👶
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">宝宝{babyAge}</h1>
            <p className="text-sm text-gray-500">当前推荐基于 <span className="font-medium text-blue-600">{ageRange}</span> 阶段</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>本周 {weekRange.label}</span>
          <span className="text-gray-300">|</span>
          <span>{topPlaces.length} 个地点 · {topItineraries.length} 条线路</span>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/weekly" className="block">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-sm hover:shadow-md transition-shadow">
            <CalendarDays className="w-6 h-6 mb-2 opacity-90" />
            <h3 className="font-bold text-base">本周推荐</h3>
            <p className="text-xs opacity-80 mt-0.5">{weekRange.label}</p>
          </div>
        </Link>
        <Link href="/monthly" className="block">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-sm hover:shadow-md transition-shadow">
            <Map className="w-6 h-6 mb-2 opacity-90" />
            <h3 className="font-bold text-base">月度计划</h3>
            <p className="text-xs opacity-80 mt-0.5">未来3个月</p>
          </div>
        </Link>
      </div>

      {/* 本周精选 - 横滚 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg text-gray-900 flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            本周精选
          </h2>
          <Link href="/weekly" className="text-sm text-blue-600 flex items-center gap-0.5">
            查看全部 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
          {topPlaces.slice(0, 4).map(place => (
            <PlaceCard key={place.id} place={place} variant="featured" />
          ))}
        </div>
      </section>

      {/* 推荐线路 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg text-gray-900">推荐线路</h2>
          <Link href="/weekly" className="text-sm text-blue-600 flex items-center gap-0.5">
            更多 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {topItineraries.slice(0, 2).map(itin => (
            <ItineraryCard key={itin.id} itinerary={itin} />
          ))}
        </div>
      </section>

      {/* 即将适合 - 预告区 */}
      {upcomingPlaces.length > 0 && (
        <section>
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h2 className="font-bold text-lg text-gray-900">即将适合</h2>
            <span className="text-xs text-gray-400 ml-1">宝宝再大一点就能去</span>
          </div>
          <div className="space-y-2">
            {upcomingPlaces.map(place => (
              <Link key={place.id} href={`/place/${place.id}`} className="block">
                <div className="bg-white/50 backdrop-blur-sm border border-orange-100 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-lg shrink-0">
                    {place.monthsUntilSuitable <= 1 ? '🔜' : '📅'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900 truncate">{place.name}</span>
                      <Badge variant="outline" className="text-[10px] shrink-0 border-orange-200 text-orange-600 px-1.5 py-0">
                        {place.monthsUntilSuitable <= 1 ? '下个月' : `${place.monthsUntilSuitable}个月后`}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{place.shortDesc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 更多地点 */}
      <section>
        <h2 className="font-bold text-lg text-gray-900 mb-3">更多推荐地点</h2>
        <div className="space-y-2.5">
          {topPlaces.slice(4, 8).map(place => (
            <PlaceCard key={place.id} place={place} variant="list" />
          ))}
        </div>
      </section>

      {/* 更新信息 */}
      <div className="text-center py-4 space-y-2">
        <Button variant="outline" size="sm" className="gap-1.5 text-gray-500" onClick={triggerManualUpdate}>
          <RefreshCw className="w-3.5 h-3.5" />
          刷新推荐
        </Button>
        <p className="text-xs text-gray-400">
          更新于 {new Date(preferences.lastUpdatedAt).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
