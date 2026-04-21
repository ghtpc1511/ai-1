'use client';

import Link from 'next/link';
import { Clock, MapPin, Baby, Umbrella } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PlaceholderImage } from '@/components/shared/PlaceholderImage';
import type { ScoredItinerary } from '@/types';

interface ItineraryCardProps {
  itinerary: ScoredItinerary;
}

export function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <Link href={`/itinerary/${itinerary.id}`} className="block">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 overflow-hidden hover:shadow-md transition-shadow">
        <PlaceholderImage category="SCENIC" colorSeed={itinerary.colorSeed} variant="hero" />
        <div className="p-4 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-base text-gray-900 leading-tight line-clamp-1">{itinerary.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{itinerary.subtitle}</p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              {itinerary.score}分
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{itinerary.summaryText}</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-xs font-normal">
              {itinerary.durationType === 'HALF_DAY' ? '半日游' : '全天'}
            </Badge>
            <Badge variant="secondary" className="text-xs font-normal">{itinerary.budgetText}</Badge>
            {itinerary.strollerFriendly && (
              <Badge variant="secondary" className="text-xs font-normal">推车友好</Badge>
            )}
            {itinerary.elderFriendly && (
              <Badge variant="secondary" className="text-xs font-normal">老人友好</Badge>
            )}
            {itinerary.rainFriendly && (
              <Badge variant="secondary" className="text-xs font-normal">雨天可行</Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />{itinerary.totalDuration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />{itinerary.districtName}
            </span>
            <span className="flex items-center gap-1">
              {itinerary.stops.filter(s => s.type === 'PLACE').length}个地点
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
