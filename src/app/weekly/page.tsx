'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { PlaceCard } from '@/components/cards/PlaceCard';
import { ItineraryCard } from '@/components/cards/ItineraryCard';
import { useApp } from '@/context/AppContext';
import { HANGZHOU_PLACES } from '@/data/places';
import { HANGZHOU_ITINERARIES } from '@/data/itineraries';
import { scorePlaces, scoreItineraries } from '@/lib/recommendation/engine';
import { formatBabyAge, getAgeRangeLabel, getWeekRange } from '@/lib/utils';
import type { ScoredPlace } from '@/types';

type FilterType = 'all' | 'free' | 'paid';
type FilterEnv = 'all' | 'indoor' | 'outdoor';
type FilterTag = 'stroller' | 'elder' | 'rain';
type SortMode = 'score' | 'distance' | 'popularity';

function sortPlaces(places: ScoredPlace[], mode: SortMode): ScoredPlace[] {
  const sorted = [...places];
  switch (mode) {
    case 'distance':
      return sorted.sort((a, b) => {
        const da = a.distanceKm ?? 9999;
        const db = b.distanceKm ?? 9999;
        return da - db;
      });
    case 'popularity':
      return sorted.sort((a, b) => b.popularity - a.popularity);
    case 'score':
    default:
      return sorted;
  }
}

export default function WeeklyPage() {
  const { preferences, babyAgeMonths, location } = useApp();
  const [priceFilter, setPriceFilter] = useState<FilterType>('all');
  const [envFilter, setEnvFilter] = useState<FilterEnv>('all');
  const [tagFilters, setTagFilters] = useState<Set<FilterTag>>(new Set());
  const [showType, setShowType] = useState<'places' | 'routes' | 'all'>('all');
  const [sortMode, setSortMode] = useState<SortMode>('score');

  const toggleTag = (tag: FilterTag) => {
    setTagFilters(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const scoredPlaces = useMemo(
    () => scorePlaces(HANGZHOU_PLACES, babyAgeMonths, location.lat, location.lng, preferences.districtId),
    [babyAgeMonths, location.lat, location.lng, preferences.districtId]
  );

  const scoredItineraries = useMemo(
    () => scoreItineraries(HANGZHOU_ITINERARIES, babyAgeMonths, location.lat, location.lng, preferences.districtId),
    [babyAgeMonths, location.lat, location.lng, preferences.districtId]
  );

  const filteredPlaces = useMemo(() => {
    const filtered = scoredPlaces.filter(p => {
      if (priceFilter === 'free' && !p.isFree) return false;
      if (priceFilter === 'paid' && p.isFree) return false;
      if (envFilter === 'indoor' && p.indoorOutdoor === 'OUTDOOR') return false;
      if (envFilter === 'outdoor' && p.indoorOutdoor === 'INDOOR') return false;
      if (tagFilters.has('stroller') && !p.strollerFriendly) return false;
      if (tagFilters.has('elder') && !p.elderFriendly) return false;
      if (tagFilters.has('rain') && !p.rainFriendly) return false;
      return true;
    });
    return sortPlaces(filtered, sortMode);
  }, [scoredPlaces, priceFilter, envFilter, tagFilters, sortMode]);

  const filteredItineraries = useMemo(() => {
    return scoredItineraries.filter(i => {
      if (tagFilters.has('stroller') && !i.strollerFriendly) return false;
      if (tagFilters.has('elder') && !i.elderFriendly) return false;
      if (tagFilters.has('rain') && !i.rainFriendly) return false;
      return true;
    });
  }, [scoredItineraries, tagFilters]);

  const ageRange = getAgeRangeLabel(babyAgeMonths);
  const weekRange = getWeekRange();

  return (
    <div className="px-4 pt-4 space-y-4">
      {/* 顶部 */}
      <div className="flex items-center gap-3">
        <Link href="/" className="p-1.5 -ml-1.5 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">本周推荐</h1>
          <p className="text-xs text-gray-500">
            {weekRange.label} · 宝宝{formatBabyAge(preferences.babyBirthDate)}（{ageRange}）
          </p>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="space-y-2">
        {/* 类型 + 排序 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {([['all', '全部'], ['places', '地点'], ['routes', '线路']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setShowType(val)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  showType === val
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/70 text-gray-600 border border-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {(showType === 'all' || showType === 'places') && (
            <div className="flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortMode}
                onChange={e => setSortMode(e.target.value as SortMode)}
                className="text-xs text-gray-600 bg-transparent border-none outline-none cursor-pointer pr-1"
              >
                <option value="score">综合排序</option>
                <option value="distance">距离优先</option>
                <option value="popularity">热度优先</option>
              </select>
            </div>
          )}
        </div>
        {/* 价格+环境 */}
        <div className="flex gap-2 flex-wrap">
          {([['all', '不限价格'], ['free', '免费'], ['paid', '付费']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setPriceFilter(val)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                priceFilter === val
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-50 text-gray-500 border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
          {([['all', '不限环境'], ['indoor', '室内'], ['outdoor', '室外']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setEnvFilter(val)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                envFilter === val
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-50 text-gray-500 border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {/* 特殊标签 */}
        <div className="flex gap-2">
          {([['stroller', '推车友好'], ['elder', '老人友好'], ['rain', '雨天可去']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => toggleTag(val)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                tagFilters.has(val)
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'bg-gray-50 text-gray-500 border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 结果统计 */}
      <p className="text-xs text-gray-400">
        共 {filteredPlaces.length} 个地点
        {(showType === 'all' || showType === 'routes') ? `、${filteredItineraries.length} 条线路` : ''}
      </p>

      {/* 结果列表 */}
      <div className="space-y-3">
        {(showType === 'all' || showType === 'routes') && filteredItineraries.length > 0 && (
          <div className="space-y-3">
            {showType === 'all' && <h3 className="text-sm font-semibold text-gray-500">推荐线路</h3>}
            {filteredItineraries.map(itin => (
              <ItineraryCard key={itin.id} itinerary={itin} />
            ))}
          </div>
        )}

        {(showType === 'all' || showType === 'places') && filteredPlaces.length > 0 && (
          <div className="space-y-2.5">
            {showType === 'all' && <h3 className="text-sm font-semibold text-gray-500 mt-2">推荐地点</h3>}
            {filteredPlaces.map(place => (
              <PlaceCard key={place.id} place={place} variant="list" />
            ))}
          </div>
        )}

        {filteredPlaces.length === 0 && filteredItineraries.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">当前筛选条件下没有推荐内容</p>
            <p className="text-xs mt-1">试试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
}
