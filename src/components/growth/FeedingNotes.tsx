'use client';

import type { GrowthKnowledge } from '@/types';
import { useBabyAge } from '@/hooks/useSettings';

interface FeedingNotesProps {
  data: GrowthKnowledge[];
}

export default function FeedingNotes({ data }: FeedingNotesProps) {
  const { ageMonths } = useBabyAge();

  if (!data || data.length === 0) {
    return <p className="text-base text-gray-500 text-center py-4">暂无数据</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const isCurrentAge = ageMonths >= item.minAgeMonths && ageMonths <= item.maxAgeMonths;
        const notes: string[] = (() => {
          try { return JSON.parse(item.content); } catch { return [item.content]; }
        })();

        return (
          <div
            key={item.id}
            className={`rounded-2xl border p-4 ${
              isCurrentAge
                ? 'bg-orange-50 border-orange-200 shadow-sm'
                : 'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              {isCurrentAge && (
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">
                  当前阶段
                </span>
              )}
            </div>
            <ul className="space-y-2">
              {notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                  <span className="text-base text-gray-700 leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
