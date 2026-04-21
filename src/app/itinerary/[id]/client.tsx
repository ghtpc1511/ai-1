'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Clock, MapPin, DollarSign, Baby, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PlaceholderImage } from '@/components/shared/PlaceholderImage';
import { useApp } from '@/context/AppContext';
import { formatBabyAge, getAgeRangeLabel } from '@/lib/utils';
import type { Itinerary, ItineraryStop } from '@/types';

interface Props {
  itinerary: Itinerary;
}

const stopTypeConfig: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  PLACE: { color: 'bg-blue-500', bg: 'bg-blue-50', label: '游玩', icon: '📍' },
  MEAL: { color: 'bg-orange-500', bg: 'bg-orange-50', label: '用餐', icon: '🍽️' },
  REST: { color: 'bg-green-500', bg: 'bg-green-50', label: '休息', icon: '😴' },
  TRANSPORT: { color: 'bg-gray-400', bg: 'bg-gray-50', label: '交通', icon: '🚗' },
};

const transportModeLabel: Record<string, string> = {
  WALK: '步行',
  METRO: '地铁',
  BUS: '公交',
  TAXI: '打车',
  DRIVE: '自驾',
};

export function ItineraryDetailClient({ itinerary }: Props) {
  const router = useRouter();
  const { preferences, babyAgeMonths } = useApp();
  const babyAge = formatBabyAge(preferences.babyBirthDate);
  const ageRange = getAgeRangeLabel(babyAgeMonths);
  const isAgeMatch = babyAgeMonths >= itinerary.minAgeMonths && babyAgeMonths <= itinerary.maxAgeMonths;

  return (
    <div className="pb-6">
      {/* 顶部大图 */}
      <div className="relative">
        <PlaceholderImage category="SCENIC" colorSeed={itinerary.colorSeed} variant="hero" className="rounded-none" />
        <button onClick={() => router.back()} className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="px-4 space-y-5 -mt-4 relative z-10">
        {/* 标题 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-sm border border-white/50">
          <h1 className="text-xl font-bold text-gray-900">{itinerary.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{itinerary.subtitle}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              {itinerary.durationType === 'HALF_DAY' ? '半日游' : '全天'}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {itinerary.budgetText}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {itinerary.districtName}
            </Badge>
          </div>
        </div>

        {/* 概览 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="space-y-1">
              <Clock className="w-5 h-5 mx-auto text-blue-500" />
              <p className="text-xs text-gray-500">总时长</p>
              <p className="text-sm font-bold text-gray-900">{itinerary.totalDuration}</p>
            </div>
            <div className="space-y-1">
              <DollarSign className="w-5 h-5 mx-auto text-orange-500" />
              <p className="text-xs text-gray-500">预算</p>
              <p className="text-sm font-bold text-gray-900">{itinerary.budgetText}</p>
            </div>
            <div className="space-y-1">
              <MapPin className="w-5 h-5 mx-auto text-green-500" />
              <p className="text-xs text-gray-500">地点数</p>
              <p className="text-sm font-bold text-gray-900">{itinerary.stops.filter(s => s.type === 'PLACE').length}个</p>
            </div>
          </div>
        </div>

        {/* 适龄 */}
        <div className={`rounded-2xl p-4 text-sm ${isAgeMatch ? 'bg-green-50 border border-green-100' : 'bg-yellow-50 border border-yellow-100'}`}>
          <div className="flex items-center gap-2">
            <Baby className="w-4 h-4" />
            <span className="font-medium">{isAgeMatch ? `适合当前宝宝（${babyAge}）` : `当前宝宝${babyAge}，建议关注`}</span>
          </div>
        </div>

        {/* 友好度 */}
        <div className="flex gap-2 flex-wrap">
          {itinerary.strollerFriendly && (
            <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">🍼 推车友好</span>
          )}
          {itinerary.elderFriendly && (
            <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">👴 老人友好</span>
          )}
          {itinerary.rainFriendly && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">🌧️ 雨天可行</span>
          )}
          {!itinerary.rainFriendly && (
            <span className="text-xs bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full border border-yellow-100">☀️ 建议晴天</span>
          )}
        </div>

        {/* 行程描述 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
          <p className="text-sm text-gray-700 leading-relaxed">{itinerary.summaryText}</p>
        </div>

        {/* 时间线 */}
        <section>
          <h2 className="font-bold text-base text-gray-900 mb-4">行程安排</h2>
          <div className="space-y-0">
            {itinerary.stops.map((stop, idx) => (
              <TimelineStopCard key={idx} stop={stop} isLast={idx === itinerary.stops.length - 1} />
            ))}
          </div>
        </section>

        {/* 亮点 */}
        {itinerary.routeHighlights.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
            <h2 className="font-bold text-sm text-gray-900 mb-2">线路亮点</h2>
            <ul className="space-y-1.5">
              {itinerary.routeHighlights.map((h, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                  <span className="text-yellow-500 mt-0.5">★</span>{h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 注意事项 */}
        {itinerary.routeTips.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
            <h2 className="font-bold text-sm text-gray-900 mb-2">注意事项</h2>
            <ul className="space-y-1.5">
              {itinerary.routeTips.map((t, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                  <span className="text-orange-500 mt-0.5">•</span>{t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5">
          {itinerary.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center">信息更新于 {itinerary.updatedAt}</p>
      </div>
    </div>
  );
}

function TimelineStopCard({ stop, isLast }: { stop: ItineraryStop; isLast: boolean }) {
  const config = stopTypeConfig[stop.type] || stopTypeConfig.PLACE;

  return (
    <div className="flex gap-3">
      {/* 时间线 */}
      <div className="flex flex-col items-center w-8">
        <div className={`w-7 h-7 rounded-full ${config.bg} flex items-center justify-center text-sm ring-2 ring-white shadow-sm`}>
          {config.icon}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
      </div>

      {/* 内容 */}
      <div className={`flex-1 ${config.bg} rounded-2xl p-4 mb-3`}>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-medium text-gray-500">{stop.startTime} - {stop.endTime}</span>
          <span className="text-[11px] font-medium text-gray-400">{config.label} · {stop.duration}分钟</span>
        </div>
        <h3 className="font-bold text-sm text-gray-900 mb-1">
          {stop.placeId ? (
            <Link href={`/place/${stop.placeId}`} className="text-blue-700 underline-offset-2 hover:underline">
              {stop.placeName}
            </Link>
          ) : (
            stop.placeName
          )}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{stop.description}</p>
        {stop.tips && <p className="text-xs text-gray-500 mt-1.5">💡 {stop.tips}</p>}

        {/* 交通到下一站 */}
        {stop.transportToNext && (
          <div className="mt-2.5 pt-2.5 border-t border-gray-200/50 flex items-center gap-2 text-xs text-gray-500">
            <ArrowDown className="w-3 h-3" />
            <span>{transportModeLabel[stop.transportToNext.mode] || stop.transportToNext.mode}</span>
            <span>{stop.transportToNext.duration}分钟</span>
            {stop.transportToNext.distance && <span>({stop.transportToNext.distance})</span>}
          </div>
        )}
      </div>
    </div>
  );
}
