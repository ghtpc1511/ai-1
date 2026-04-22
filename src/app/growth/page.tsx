'use client';

import { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import HeightWeightTable from '@/components/growth/HeightWeightTable';
import FeedingNotes from '@/components/growth/FeedingNotes';
import ForbiddenFoods from '@/components/growth/ForbiddenFoods';
import { useSettings } from '@/contexts/SettingsContext';
import type { GrowthKnowledge, GrowthCategory, Gender } from '@/types';

const tabs: { key: GrowthCategory; label: string }[] = [
  { key: 'height_weight', label: '身高体重' },
  { key: 'feeding_notes', label: '喂养注意' },
  { key: 'forbidden_foods', label: '禁止喂养' },
];

export default function GrowthPage() {
  const { settings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<GrowthCategory>('height_weight');
  const [data, setData] = useState<Record<GrowthCategory, GrowthKnowledge[]>>({
    height_weight: [],
    feeding_notes: [],
    forbidden_foods: [],
  });
  const [loading, setLoading] = useState(true);
  const gender = settings.babyGender;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/growth?gender=${gender}`)
      .then((r) => r.json() as Promise<Record<GrowthCategory, GrowthKnowledge[]>>)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [gender]);

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">成长知识</h1>

      {/* Gender Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => updateSettings({ babyGender: 'male' })}
          className={`flex-1 py-2.5 rounded-xl text-base font-bold min-h-[44px] transition-all ${
            gender === 'male'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          👦 男宝
        </button>
        <button
          onClick={() => updateSettings({ babyGender: 'female' })}
          className={`flex-1 py-2.5 rounded-xl text-base font-bold min-h-[44px] transition-all ${
            gender === 'female'
              ? 'bg-pink-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          👧 女宝
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all min-h-[40px] ${
              activeTab === tab.key
                ? 'bg-white text-orange-500 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {activeTab === 'height_weight' && <HeightWeightTable data={data.height_weight} />}
          {activeTab === 'feeding_notes' && <FeedingNotes data={data.feeding_notes} />}
          {activeTab === 'forbidden_foods' && <ForbiddenFoods data={data.forbidden_foods} />}
        </>
      )}
    </PageContainer>
  );
}
