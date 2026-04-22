'use client';

import { useState } from 'react';
import type { MealType } from '@/types';
import { MEAL_TYPE_LABELS } from '@/types';

interface MealTypeSelectorProps {
  value: MealType;
  onChange: (mt: MealType) => void;
}

export default function MealTypeSelector({ value, onChange }: MealTypeSelectorProps) {
  const types: MealType[] = ['breakfast', 'lunch', 'dinner'];

  return (
    <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
      {types.map((mt) => (
        <button
          key={mt}
          onClick={() => onChange(mt)}
          className={`flex-1 py-2.5 rounded-lg text-base font-bold transition-all min-h-[44px] ${
            value === mt
              ? 'bg-white text-orange-500 shadow-sm'
              : 'text-gray-500 active:bg-gray-200'
          }`}
        >
          {MEAL_TYPE_LABELS[mt]}
        </button>
      ))}
    </div>
  );
}
