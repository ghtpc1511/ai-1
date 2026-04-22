'use client';

import { useFavorites } from '@/hooks/useFavorites';

export default function FavoriteButton({ recipeId, size = 'sm' }: { recipeId: string; size?: 'sm' | 'lg' }) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) return null;

  const active = isFavorite(recipeId);
  const sizeClass = size === 'lg' ? 'w-12 h-12 text-2xl' : 'w-9 h-9 text-lg';

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
      className={`${sizeClass} flex items-center justify-center rounded-full backdrop-blur-md transition-all ${
        active
          ? 'bg-red-500/90 text-white shadow-lg'
          : 'bg-white/70 text-gray-400 shadow-sm'
      }`}
      aria-label={active ? '取消收藏' : '收藏'}
    >
      {active ? '♥' : '♡'}
    </button>
  );
}
