'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserPreferences, Gender } from '@/types';
import { DEFAULT_PREFERENCES } from '@/types';

interface SettingsContextType {
  settings: UserPreferences;
  updateSettings: (updates: Partial<UserPreferences>) => void;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_PREFERENCES,
  updateSettings: () => {},
  isLoaded: false,
});

const STORAGE_KEY = 'baby-recipe-settings';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  const updateSettings = (updates: Partial<UserPreferences>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
