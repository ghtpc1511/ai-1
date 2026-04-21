'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserPreferences, Season } from '@/types';
import { DEFAULT_PREFERENCES } from '@/types';
import { loadPreferences, savePreferences } from '@/lib/storage';
import { calculateBabyAgeMonths, getCurrentSeason } from '@/lib/utils';

interface AppState {
  preferences: UserPreferences;
  babyAgeMonths: number;
  currentSeason: Season;
  location: {
    lat: number | null;
    lng: number | null;
    permissionStatus: 'granted' | 'denied' | 'prompt' | 'loading';
  };
  updatePreferences: (partial: Partial<UserPreferences>) => void;
  requestGeolocation: () => Promise<void>;
  triggerManualUpdate: () => void;
  lastRefreshKey: number;
}

const defaultState: AppState = {
  preferences: DEFAULT_PREFERENCES,
  babyAgeMonths: calculateBabyAgeMonths(DEFAULT_PREFERENCES.babyBirthDate),
  currentSeason: getCurrentSeason(),
  location: { lat: null, lng: null, permissionStatus: 'prompt' },
  updatePreferences: () => {},
  requestGeolocation: async () => {},
  triggerManualUpdate: () => {},
  lastRefreshKey: 0,
};

const AppContext = createContext<AppState>(defaultState);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [mounted, setMounted] = useState(false);
  const [location, setLocation] = useState<AppState['location']>({
    lat: null,
    lng: null,
    permissionStatus: 'prompt',
  });
  const [lastRefreshKey, setLastRefreshKey] = useState(0);

  useEffect(() => {
    setPreferences(loadPreferences());
    setMounted(true);
  }, []);

  const babyAgeMonths = calculateBabyAgeMonths(preferences.babyBirthDate);
  const currentSeason = getCurrentSeason();

  const updatePreferences = useCallback((partial: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...partial, lastUpdatedAt: new Date().toISOString() };
      savePreferences(updated);
      return updated;
    });
  }, []);

  const requestGeolocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, permissionStatus: 'denied' }));
      return;
    }
    setLocation(prev => ({ ...prev, permissionStatus: 'loading' }));
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        });
      });
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        permissionStatus: 'granted',
      });
      updatePreferences({
        lastKnownLat: position.coords.latitude,
        lastKnownLng: position.coords.longitude,
        useGeolocation: true,
      });
    } catch {
      setLocation(prev => ({ ...prev, permissionStatus: 'denied' }));
    }
  }, [updatePreferences]);

  const triggerManualUpdate = useCallback(() => {
    setLastRefreshKey(Date.now());
    updatePreferences({ lastUpdatedAt: new Date().toISOString() });
  }, [updatePreferences]);

  // 尝试自动定位
  useEffect(() => {
    if (mounted && preferences.useGeolocation && location.permissionStatus === 'prompt') {
      requestGeolocation();
    }
  }, [mounted, preferences.useGeolocation, location.permissionStatus, requestGeolocation]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AppContext.Provider
      value={{
        preferences,
        babyAgeMonths,
        currentSeason,
        location,
        updatePreferences,
        requestGeolocation,
        triggerManualUpdate,
        lastRefreshKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
