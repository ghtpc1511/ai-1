'use client';

import Link from 'next/link';
import type { Recipe } from '@/types';
import { MEAL_TYPE_LABELS, DIFFICULTY_LABELS } from '@/types';
import FavoriteButton from './FavoriteButton';

export default function RecipeCard({ recipe, compact = false }: { recipe: Recipe; compact?: boolean }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform">
        {/* Cover Image */}
        <div className="relative aspect-[4/3] bg-orange-50">
          <img
            src={recipe.coverImage || '/placeholder.svg'}
            alt={recipe.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <span className="inline-block px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              {MEAL_TYPE_LABELS[recipe.mealType]}
            </span>
          </div>
          <div className="absolute top-2 right-2" onClick={(e) => e.preventDefault()}>
            <FavoriteButton recipeId={recipe.id} />
          </div>
        </div>

        {/* Info */}
        <div className="p-3.5">
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
            {recipe.name}
          </h3>

          {!compact && recipe.summaryText && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {recipe.summaryText}
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded-lg font-medium">
              {DIFFICULTY_LABELS[recipe.difficultyLevel]}
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">
              {recipe.cookTimeMinutes}分钟
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-orange-50 text-orange-700 rounded-lg font-medium">
              {recipe.estimatedPriceText}
            </span>
          </div>

          {!compact && (
            <div className="mt-2 text-xs text-gray-400">
              适合 {recipe.minAgeMonths}-{recipe.maxAgeMonths}个月宝宝
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
