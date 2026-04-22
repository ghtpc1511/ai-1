'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'baby-recipe-favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavoriteIds(JSON.parse(stored));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  const saveFavorites = useCallback((ids: string[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    } catch {}
  }, []);

  const toggleFavorite = useCallback((recipeId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];
      saveFavorites(next);
      return next;
    });
  }, [saveFavorites]);

  const isFavorite = useCallback(
    (recipeId: string) => favoriteIds.includes(recipeId),
    [favoriteIds]
  );

  return { favoriteIds, toggleFavorite, isFavorite, isLoaded };
}
