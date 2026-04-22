'use client';

import { useState, useEffect } from 'react';
import type { Recipe, FeedResponse } from '@/types';
import { useBabyAge } from '@/hooks/useSettings';
import RecipeCard from '../recipe/RecipeCard';

export default function RecipeFeed() {
  const { ageMonths, isEligible } = useBabyAge();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadMore = async (pageNum: number, append = true) => {
    if (!isEligible) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/feed?ageMonths=${ageMonths}&page=${pageNum}&pageSize=10`);
      const data = await res.json() as FeedResponse;
      setRecipes((prev) => append ? [...prev, ...data.items.map((i) => i.recipe)] : data.items.map((i) => i.recipe));
      setHasMore(data.hasMore);
      setTotal(data.total);
      setPage(pageNum);
    } catch (e) {
      console.error('Feed load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEligible) {
      setRecipes([]);
      setPage(1);
      loadMore(1, false);
    }
  }, [ageMonths, isEligible]);

  if (!isEligible) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">更多好菜</h2>
        <span className="text-sm text-gray-400">
          {recipes.length}/{Math.min(total, 20)}
        </span>
      </div>

      <div className="space-y-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {loading && (
        <div className="py-4 text-center">
          <div className="inline-block w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {hasMore && !loading && recipes.length < 20 && (
        <button
          onClick={() => loadMore(page + 1)}
          className="w-full py-3.5 bg-orange-50 text-orange-600 rounded-2xl text-base font-bold min-h-[48px] active:bg-orange-100 transition-colors"
        >
          查看更多推荐
        </button>
      )}

      {!hasMore && recipes.length > 0 && (
        <p className="text-center text-sm text-gray-400 py-2">已展示全部推荐</p>
      )}
    </div>
  );
}
