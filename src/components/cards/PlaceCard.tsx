'use client';

import Link from 'next/link';
import { MapPin, Clock, Baby, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PlaceholderImage } from '@/components/shared/PlaceholderImage';
import type { ScoredPlace } from '@/types';
import { formatDistance } from '@/lib/utils';

interface PlaceCardProps {
  place: ScoredPlace;
  variant?: 'featured' | 'list';
}

export function PlaceCard({ place, variant = 'list' }: PlaceCardProps) {
  if (variant === 'featured') {
    return (
      <Link href={`/place/${place.id}`} className="block min-w-[280px] snap-start">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 overflow-hidden hover:shadow-md transition-shadow">
          <PlaceholderImage category={place.category} colorSeed={place.colorSeed} variant="featured" />
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-base text-gray-900 leading-tight line-clamp-1">{place.name}</h3>
              <span className="shrink-0 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                {place.score}分
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{place.shortDesc}</p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs font-normal">
                {place.isFree ? '免费' : place.priceText.split('，')[0]}
              </Badge>
              <Badge variant="secondary" className="text-xs font-normal">
                {place.indoorOutdoor === 'INDOOR' ? '室内' : place.indoorOutdoor === 'OUTDOOR' ? '室外' : '室内外'}
              </Badge>
              {place.strollerFriendly && (
                <Badge variant="secondary" className="text-xs font-normal">推车友好</Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {place.distanceKm ? formatDistance(place.distanceKm) : place.districtName}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                约{Math.round(place.durationSuggestion / 60 * 10) / 10}h
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // list variant
  return (
    <Link href={`/place/${place.id}`} className="block">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-3 flex gap-3 hover:shadow-md transition-shadow">
        <div className="w-24 h-24 shrink-0">
          <PlaceholderImage category={place.category} colorSeed={place.colorSeed} variant="list" />
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-[15px] text-gray-900 line-clamp-1">{place.name}</h3>
            <span className="shrink-0 text-xs font-semibold text-orange-600">{place.score}分</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-1">{place.shortDesc}</p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-[11px] font-normal px-1.5 py-0">
              {place.isFree ? '免费' : '付费'}
            </Badge>
            {place.elderFriendly && (
              <Badge variant="secondary" className="text-[11px] font-normal px-1.5 py-0">老人友好</Badge>
            )}
            {place.rainFriendly && (
              <Badge variant="secondary" className="text-[11px] font-normal px-1.5 py-0">雨天可去</Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3" />
              {place.distanceKm ? formatDistance(place.distanceKm) : place.districtName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
