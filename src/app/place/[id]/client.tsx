'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, Clock, Baby, DollarSign, CalendarDays, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PlaceholderImage } from '@/components/shared/PlaceholderImage';
import { PlaceCard } from '@/components/cards/PlaceCard';
import { useApp } from '@/context/AppContext';
import { HANGZHOU_PLACES } from '@/data/places';
import { scorePlaces } from '@/lib/recommendation/engine';
import { formatBabyAge, getAgeRangeLabel, formatDistance, haversineDistance } from '@/lib/utils';
import type { Place, ScoredPlace } from '@/types';
import { useMemo } from 'react';

interface Props {
  place: Place;
}

export function PlaceDetailClient({ place }: Props) {
  const router = useRouter();
  const { preferences, babyAgeMonths, location } = useApp();
  const babyAge = formatBabyAge(preferences.babyBirthDate);
  const ageRange = getAgeRangeLabel(babyAgeMonths);
  const isAgeMatch = babyAgeMonths >= place.minAgeMonths && babyAgeMonths <= place.maxAgeMonths;

  let distanceText = place.districtName;
  if (location.lat && location.lng) {
    const km = haversineDistance(location.lat, location.lng, place.lat, place.lng);
    distanceText = `距你约${formatDistance(km)}`;
  }

  const relatedPlaces: ScoredPlace[] = useMemo(() => {
    const scored = scorePlaces(
      HANGZHOU_PLACES.filter(p => p.id !== place.id),
      babyAgeMonths,
      location.lat,
      location.lng,
      preferences.districtId
    );
    return scored.slice(0, 3);
  }, [place.id, babyAgeMonths, location.lat, location.lng, preferences.districtId]);

  return (
    <div className="pb-6">
      {/* 顶部大图 */}
      <div className="relative">
        <PlaceholderImage category={place.category} colorSeed={place.colorSeed} variant="hero" className="rounded-none" />
        <button onClick={() => router.back()} className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="px-4 space-y-5 -mt-4 relative z-10">
        {/* 标题区 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-sm border border-white/50">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h1 className="text-xl font-bold text-gray-900">{place.name}</h1>
            <Badge className={place.isFree ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
              {place.isFree ? '免费' : '付费'}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{place.shortDesc}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{distanceText}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />约{Math.round(place.durationSuggestion / 60 * 10) / 10}小时</span>
          </div>
        </div>

        {/* 适龄信息 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
          <h2 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
            <Baby className="w-4 h-4 text-pink-500" />
            适龄信息
          </h2>
          <div className={`rounded-xl p-3 text-sm ${isAgeMatch ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
            <p className="font-medium">{isAgeMatch ? `适合当前宝宝（${babyAge}）` : `当前宝宝${babyAge}，可能不是最佳阶段`}</p>
            <p className="mt-1 text-xs opacity-80">{place.ageNote}</p>
          </div>
        </div>

        {/* 费用信息 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
          <h2 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-orange-500" />
            {place.isFree ? '费用说明' : '价格信息'}
          </h2>
          <div className="space-y-2 text-sm">
            <div className={`rounded-xl p-3 ${place.isFree ? 'bg-green-50' : 'bg-orange-50'}`}>
              <p className={`font-medium ${place.isFree ? 'text-green-700' : 'text-orange-800'}`}>{place.priceText}</p>
            </div>
            {place.needReservation && (
              <p className="text-orange-600 font-medium text-xs bg-orange-50 rounded-lg px-3 py-1.5">需要提前预约</p>
            )}
            {place.priceNotes && <p className="text-gray-600">{place.priceNotes}</p>}
            {place.hiddenCosts && place.hiddenCosts !== '无' && (
              <div className="flex items-start gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-amber-500 mt-px">!</span>
                <span>隐性费用: {place.hiddenCosts}</span>
              </div>
            )}
            <p className="text-xs text-gray-400">
              价格更新于 {place.priceUpdatedAt}
              {place.priceSource && ` · 来源: ${place.priceSource}`}
            </p>
          </div>
        </div>

        {/* 设施标签 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
          <h2 className="font-bold text-sm text-gray-900 mb-3">设施与便利度</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { ok: place.strollerFriendly, label: '婴儿车友好', icon: '🍼' },
              { ok: place.elderFriendly, label: '老人友好', icon: '👴' },
              { ok: place.rainFriendly, label: '雨天可去', icon: '🌧️' },
              { ok: place.hasNursingRoom, label: '母婴室', icon: '🤱' },
              { ok: place.hasRestroom, label: '卫生间', icon: '🚻' },
              { ok: place.hasRestArea, label: '休息区', icon: '💺' },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                  item.ok ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <span className="ml-auto text-xs">{item.ok ? '✓' : '✗'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 最佳游玩时间 */}
        {place.bestVisitMonths.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
            <h2 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-blue-500" />
              最佳游玩时间
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
                const isBest = place.bestVisitMonths.includes(m);
                const isCurrent = m === new Date().getMonth() + 1;
                return (
                  <span
                    key={m}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium ${
                      isBest && isCurrent
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                        : isBest
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-50 text-gray-300'
                    }`}
                  >
                    {m}月
                  </span>
                );
              })}
            </div>
            {place.bestVisitMonths.includes(new Date().getMonth() + 1) ? (
              <p className="text-xs text-green-600 mt-2 font-medium">当前正是最佳游玩时段</p>
            ) : (
              <p className="text-xs text-gray-400 mt-2">当前月份不在最佳游玩时段</p>
            )}
          </div>
        )}

        {/* 详细信息 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50 space-y-4">
          <h2 className="font-bold text-sm text-gray-900">详细信息</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <span className="font-medium text-gray-800">开放时间: </span>
              <span>{place.openHours}</span>
              {place.closedDays.length > 0 && <span className="text-red-500 ml-1">({place.closedDays.join('、')}闭馆)</span>}
            </div>
            <div>
              <span className="font-medium text-gray-800">地址: </span>
              <span>{place.address}</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">交通: </span>
              <span>{place.transportInfo}</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">停车: </span>
              <span>{place.parkingInfo}</span>
            </div>
          </div>
        </div>

        {/* 描述 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50 space-y-3">
          <h2 className="font-bold text-sm text-gray-900">推荐理由</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{place.description}</p>

          {place.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-800 mb-1.5">亮点</h3>
              <ul className="space-y-1">
                {place.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                    <span className="text-green-500 mt-0.5">•</span>{h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {place.playTips.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-800 mb-1.5">玩法建议</h3>
              <ul className="space-y-1">
                {place.playTips.map((t, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                    <span className="text-blue-500 mt-0.5">•</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {place.tips.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-800 mb-1.5">注意事项</h3>
              <ul className="space-y-1">
                {place.tips.map((t, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                    <span className="text-orange-500 mt-0.5">•</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5">
          {place.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        {/* 公开信息参考 */}
        {place.publicInfoRefs && place.publicInfoRefs.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50">
            <h2 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-gray-400" />
              公开信息参考
            </h2>
            <p className="text-[11px] text-gray-400 mb-2.5">以下信息可帮助你获取最新动态，请自行搜索验证</p>
            <div className="space-y-2">
              {place.publicInfoRefs.map((ref, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-xs text-gray-400 bg-gray-100 rounded px-1.5 py-0.5 shrink-0">{ref.label}</span>
                  <span className="text-gray-700">{ref.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 相关推荐 */}
        {relatedPlaces.length > 0 && (
          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">相关推荐</h2>
            <div className="space-y-2.5">
              {relatedPlaces.map(p => (
                <PlaceCard key={p.id} place={p} variant="list" />
              ))}
            </div>
          </section>
        )}

        {/* 更新时间 */}
        <p className="text-xs text-gray-400 text-center">信息更新于 {place.updatedAt}</p>
      </div>
    </div>
  );
}
