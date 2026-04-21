import type { Place, Itinerary, MonthlyRecommendation } from '@/types';
import { HANGZHOU_PLACES } from './places';
import { HANGZHOU_ITINERARIES } from './itineraries';
import { MONTHLY_RECOMMENDATIONS } from './monthly';

// 统一数据仓库接口 — 未来替换为真实 API 只需改这里
export interface DataRepository {
  getPlaces(cityId: string): Promise<Place[]>;
  getPlaceById(id: string): Promise<Place | null>;
  getItineraries(cityId: string): Promise<Itinerary[]>;
  getItineraryById(id: string): Promise<Itinerary | null>;
  getMonthlyRecommendations(cityId: string): Promise<MonthlyRecommendation[]>;
}

class MockRepository implements DataRepository {
  async getPlaces(cityId: string): Promise<Place[]> {
    return HANGZHOU_PLACES.filter(p => p.cityId === cityId);
  }

  async getPlaceById(id: string): Promise<Place | null> {
    return HANGZHOU_PLACES.find(p => p.id === id) ?? null;
  }

  async getItineraries(cityId: string): Promise<Itinerary[]> {
    return HANGZHOU_ITINERARIES.filter(i => i.cityId === cityId);
  }

  async getItineraryById(id: string): Promise<Itinerary | null> {
    return HANGZHOU_ITINERARIES.find(i => i.id === id) ?? null;
  }

  async getMonthlyRecommendations(cityId: string): Promise<MonthlyRecommendation[]> {
    return MONTHLY_RECOMMENDATIONS.filter(m => m.cityId === cityId);
  }
}

export const repository: DataRepository = new MockRepository();
