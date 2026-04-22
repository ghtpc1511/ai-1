'use client';

import type { MealType, DifficultyLevel } from '@/types';
import { MEAL_TYPE_LABELS, DIFFICULTY_LABELS } from '@/types';

interface FilterState {
  mealType?: MealType;
  difficulty?: DifficultyLevel;
  maxCookTime?: number;
}

interface RecipeFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const cookTimeOptions = [
  { label: '10分钟内', value: 10 },
  { label: '20分钟内', value: 20 },
  { label: '30分钟内', value: 30 },
  { label: '不限', value: undefined },
];

export default function RecipeFilter({ filters, onChange }: RecipeFilterProps) {
  const toggleMealType = (mt: MealType) => {
    onChange({ ...filters, mealType: filters.mealType === mt ? undefined : mt });
  };

  const toggleDifficulty = (d: DifficultyLevel) => {
    onChange({ ...filters, difficulty: filters.difficulty === d ? undefined : d });
  };

  const toggleCookTime = (t: number | undefined) => {
    onChange({ ...filters, maxCookTime: filters.maxCookTime === t ? undefined : t });
  };

  return (
    <div className="space-y-4">
      {/* Meal Type */}
      <div>
        <h3 className="text-base font-bold text-gray-700 mb-2">类型</h3>
        <div className="flex gap-2 flex-wrap">
          {(Object.entries(MEAL_TYPE_LABELS) as [MealType, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleMealType(key)}
              className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all min-h-[44px] ${
                filters.mealType === key
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 active:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="text-base font-bold text-gray-700 mb-2">难度</h3>
        <div className="flex gap-2 flex-wrap">
          {([1, 2, 3] as DifficultyLevel[]).map((d) => (
            <button
              key={d}
              onClick={() => toggleDifficulty(d)}
              className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all min-h-[44px] ${
                filters.difficulty === d
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 active:bg-gray-200'
              }`}
            >
              {DIFFICULTY_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      {/* Cook Time */}
      <div>
        <h3 className="text-base font-bold text-gray-700 mb-2">耗时</h3>
        <div className="flex gap-2 flex-wrap">
          {cookTimeOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => toggleCookTime(opt.value)}
              className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all min-h-[44px] ${
                filters.maxCookTime === opt.value
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 active:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
