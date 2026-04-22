'use client';

import { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import RecipeCard from '@/components/recipe/RecipeCard';
import { useFavorites } from '@/hooks/useFavorites';
import type { Recipe } from '@/types';

export default function FavoritesPage() {
  const { favoriteIds, isLoaded } = useFavorites();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (favoriteIds.length === 0) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    // Fetch all favorite recipes
    setLoading(true);
    Promise.all(
      favoriteIds.map((id) =>
        fetch(`/api/recipes/${id}`)
          .then((r) => (r.ok ? r.json() as Promise<Recipe> : null))
          .catch(() => null)
      )
    )
      .then((results) => setRecipes(results.filter(Boolean) as Recipe[]))
      .finally(() => setLoading(false));
  }, [favoriteIds, isLoaded]);

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">我的收藏</h1>

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
        <div className="text-center py-16">
          <p className="text-5xl mb-4">❤️</p>
          <p className="text-xl text-gray-600 font-bold mb-2">还没有收藏食谱</p>
          <p className="text-base text-gray-400">浏览食谱时点击爱心即可收藏</p>
        </div>
      )}
    </PageContainer>
  );
}
