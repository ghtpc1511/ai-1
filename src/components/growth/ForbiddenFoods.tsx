'use client';

import type { GrowthKnowledge } from '@/types';
import { useBabyAge } from '@/hooks/useSettings';

interface ForbiddenFoodsProps {
  data: GrowthKnowledge[];
}

export default function ForbiddenFoods({ data }: ForbiddenFoodsProps) {
  const { ageMonths } = useBabyAge();

  if (!data || data.length === 0) {
    return <p className="text-base text-gray-500 text-center py-4">暂无数据</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const isCurrentAge = ageMonths >= item.minAgeMonths && ageMonths <= item.maxAgeMonths;
        const foods: string[] = (() => {
          try { return JSON.parse(item.content); } catch { return [item.content]; }
        })();

        return (
          <div
            key={item.id}
            className={`rounded-2xl border p-4 ${
              isCurrentAge
                ? 'bg-red-50 border-red-200 shadow-sm'
                : 'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              {isCurrentAge && (
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                  当前阶段
                </span>
              )}
            </div>
            <ul className="space-y-2">
              {foods.map((food, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 flex-shrink-0 mt-1">✕</span>
                  <span className="text-base text-gray-700 leading-relaxed">{food}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
