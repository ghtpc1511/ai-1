'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import RecipeSteps from '@/components/recipe/RecipeSteps';
import IngredientList from '@/components/recipe/IngredientList';
import RecipeTips from '@/components/recipe/RecipeTips';
import SourceInfo from '@/components/recipe/SourceInfo';
import FavoriteButton from '@/components/recipe/FavoriteButton';
import { MEAL_TYPE_LABELS, DIFFICULTY_LABELS, SEASON_LABELS } from '@/types';
import type { Recipe } from '@/types';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/recipes/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json() as Promise<Recipe>;
      })
      .then(setRecipe)
      .catch(() => setRecipe(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <div className="h-56 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-8 bg-gray-100 rounded-xl animate-pulse w-2/3" />
          <div className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </PageContainer>
    );
  }

  if (!recipe) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <p className="text-5xl mb-4">😢</p>
          <p className="text-xl text-gray-600 font-bold">食谱未找到</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-xl text-base font-bold min-h-[48px]"
          >
            返回上一页
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-3 text-base text-gray-500 flex items-center gap-1 min-h-[44px] active:text-gray-700"
      >
        ← 返回
      </button>

      {/* Cover Image */}
      <div className="relative aspect-[4/3] bg-orange-50 rounded-2xl overflow-hidden mb-4 shadow-sm">
        <img
          src={recipe.coverImage || '/placeholder.svg'}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <FavoriteButton recipeId={recipe.id} size="lg" />
        </div>
      </div>

      {/* Title & Tags */}
      <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
        {recipe.name}
      </h1>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-3 py-1.5 bg-orange-500 text-white text-sm font-bold rounded-xl">
          {MEAL_TYPE_LABELS[recipe.mealType]}
        </span>
        <span className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-xl">
          {DIFFICULTY_LABELS[recipe.difficultyLevel]}
        </span>
        <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-xl">
          {recipe.cookTimeMinutes}分钟
        </span>
        <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-sm font-bold rounded-xl">
          {recipe.estimatedPriceText}
        </span>
      </div>

      {/* Age & Season Info */}
      <div className="bg-gray-50 rounded-xl p-3 mb-6 text-sm text-gray-600 space-y-1">
        <p>适合年龄：{recipe.minAgeMonths}-{recipe.maxAgeMonths}个月宝宝</p>
        <p>适合季节：{recipe.suitableSeasons.map((s) => SEASON_LABELS[s]).join('、')}</p>
      </div>

      {/* Summary */}
      {recipe.summaryText && (
        <p className="text-base text-gray-600 leading-relaxed mb-6 bg-orange-50 rounded-xl p-4">
          {recipe.summaryText}
        </p>
      )}

      {/* Ingredients */}
      <div className="mb-8">
        <IngredientList ingredients={recipe.ingredientList} priceText={recipe.estimatedPriceText} />
      </div>

      {/* Steps */}
      <div className="mb-8">
        <RecipeSteps steps={recipe.stepList} />
      </div>

      {/* Tips */}
      <div className="mb-8">
        <RecipeTips tips={recipe.tips} />
      </div>

      {/* Source Info */}
      <div className="mb-4">
        <SourceInfo
          platform={recipe.sourcePlatform}
          title={recipe.sourceTitle}
          url={recipe.sourceUrl}
        />
      </div>
    </PageContainer>
  );
}
