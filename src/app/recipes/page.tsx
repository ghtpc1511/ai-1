'use client';

import { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import RecipeCard from '@/components/recipe/RecipeCard';
import RecipeFilter from '@/components/recipe/RecipeFilter';
import { useBabyAge } from '@/hooks/useSettings';
import type { Recipe, MealType, DifficultyLevel } from '@/types';

interface FilterState {
  mealType?: MealType;
  difficulty?: DifficultyLevel;
  maxCookTime?: number;
}

export default function RecipesPage() {
  const { ageMonths } = useBabyAge();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({});
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchRecipes = async (p: number, append = false) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', String(p));
    params.set('pageSize', '12');
    if (ageMonths >= 12) params.set('ageMonths', String(ageMonths));
    if (filters.mealType) params.set('mealType', filters.mealType);
    if (filters.difficulty) params.set('difficulty', String(filters.difficulty));
    if (filters.maxCookTime) params.set('maxCookTime', String(filters.maxCookTime));

    try {
      const res = await fetch(`/api/recipes?${params}`);
      const data = await res.json() as { recipes: Recipe[]; total: number };
      setRecipes(append ? (prev) => [...prev, ...data.recipes] : data.recipes);
      setTotal(data.total);
      setPage(p);
    } catch (e) {
      console.error('Fetch recipes error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(1, false);
  }, [filters, ageMonths]);

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">食谱列表</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2 rounded-xl text-base font-medium min-h-[44px] transition-all ${
            showFilters || Object.values(filters).some(Boolean)
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          筛选
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 p-4 shadow-sm">
          <RecipeFilter filters={filters} onChange={setFilters} />
        </div>
      )}

      {loading && recipes.length === 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-56 animate-pulse" />
          ))}
        </div>
      ) : recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} compact />
            ))}
          </div>

          {recipes.length < total && (
            <button
              onClick={() => fetchRecipes(page + 1, true)}
              disabled={loading}
              className="w-full mt-4 py-3.5 bg-orange-50 text-orange-600 rounded-2xl text-base font-bold min-h-[48px] active:bg-orange-100 transition-colors disabled:opacity-50"
            >
              {loading ? '加载中...' : '加载更多'}
            </button>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-5xl mb-4">🍳</p>
          <p className="text-lg text-gray-500">暂无符合条件的食谱</p>
          <button
            onClick={() => { setFilters({}); setShowFilters(false); }}
            className="mt-4 px-6 py-2.5 bg-orange-500 text-white rounded-xl text-base font-medium min-h-[44px]"
          >
            清除筛选
          </button>
        </div>
      )}
    </PageContainer>
  );
}
