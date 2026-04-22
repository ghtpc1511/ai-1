'use client';

import PageContainer from '@/components/layout/PageContainer';
import BabyAgeCard from '@/components/home/BabyAgeCard';
import SeasonLocationCard from '@/components/home/SeasonLocationCard';
import WeeklyRecommendations from '@/components/home/WeeklyRecommendations';
import RecipeFeed from '@/components/home/RecipeFeed';

export default function HomePage() {
  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">宝宝菜谱</h1>
        <span className="text-sm text-gray-400">每周更新</span>
      </div>

      {/* Baby Age Card */}
      <div className="mb-4">
        <BabyAgeCard />
      </div>

      {/* Season + Location */}
      <div className="mb-6">
        <SeasonLocationCard />
      </div>

      {/* Weekly Recommendations */}
      <div className="mb-8">
        <WeeklyRecommendations />
      </div>

      {/* Recipe Feed */}
      <div className="mb-4">
        <RecipeFeed />
      </div>
    </PageContainer>
  );
}
