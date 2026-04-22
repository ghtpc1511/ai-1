'use client';

import { useState, useEffect } from 'react';
import type { Recipe, MealType, RecommendationsResponse } from '@/types';
import { useBabyAge } from '@/hooks/useSettings';
import MealTypeSelector from './MealTypeSelector';
import RecipeCard from '../recipe/RecipeCard';

export default function WeeklyRecommendations() {
  const { ageMonths, isEligible } = useBabyAge();
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [data, setData] = useState<RecommendationsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isEligible) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/recommendations?ageMonths=${ageMonths}`)
      .then((r) => r.json() as Promise<RecommendationsResponse>)
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [ageMonths, isEligible]);

  if (!isEligible) {
    return (
      <div className="bg-orange-50 rounded-2xl p-5 text-center">
        <p className="text-lg font-bold text-orange-800">宝宝满12个月后</p>
        <p className="text-base text-orange-600 mt-1">将为您推荐适龄食谱</p>
      </div>
    );
  }

  const recipes: Recipe[] = data?.featured?.[mealType] || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">本周推荐</h2>
      <MealTypeSelector value={mealType} onChange={setMealType} />

      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-52 animate-pulse" />
          ))}
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} compact />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <p className="text-base text-gray-500">暂无推荐，请稍后再来</p>
        </div>
      )}
    </div>
  );
}
