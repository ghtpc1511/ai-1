'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { useSettings } from '@/contexts/SettingsContext';
import { PROVINCES } from '@/lib/utils/constants';
import { formatBabyAge, calculateAgeMonths } from '@/lib/utils/age';

export default function SettingsPage() {
  const { settings, updateSettings, isLoaded } = useSettings();
  const [saved, setSaved] = useState(false);

  if (!isLoaded) {
    return (
      <PageContainer>
        <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
      </PageContainer>
    );
  }

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectedProvince = PROVINCES.find((p) => p.value === settings.province);
  const cities = selectedProvince?.cities || [];

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">设置</h1>

      {/* Success Toast */}
      {saved && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg text-base font-bold">
          已保存
        </div>
      )}

      <div className="space-y-6">
        {/* Baby Birth Date */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <label className="block text-lg font-bold text-gray-800 mb-3">
            宝宝出生日期
          </label>
          <input
            type="date"
            value={settings.babyBirthDate || ''}
            onChange={(e) => {
              updateSettings({ babyBirthDate: e.target.value });
              showSaved();
            }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg text-gray-800 min-h-[48px]"
          />
          {settings.babyBirthDate && (
            <p className="mt-2 text-base text-orange-500 font-medium">
              宝宝现在 {formatBabyAge(settings.babyBirthDate)}
              {calculateAgeMonths(settings.babyBirthDate) < 12 && (
                <span className="text-gray-400 text-sm ml-2">（满12个月后开始推荐食谱）</span>
              )}
            </p>
          )}
        </div>

        {/* Baby Gender */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <label className="block text-lg font-bold text-gray-800 mb-3">
            宝宝性别
          </label>
          <p className="text-sm text-gray-400 mb-3">仅用于成长知识展示，不影响食谱推荐</p>
          <div className="flex gap-3">
            <button
              onClick={() => { updateSettings({ babyGender: 'male' }); showSaved(); }}
              className={`flex-1 py-3 rounded-xl text-lg font-bold min-h-[52px] transition-all ${
                settings.babyGender === 'male'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              👦 男宝
            </button>
            <button
              onClick={() => { updateSettings({ babyGender: 'female' }); showSaved(); }}
              className={`flex-1 py-3 rounded-xl text-lg font-bold min-h-[52px] transition-all ${
                settings.babyGender === 'female'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              👧 女宝
            </button>
          </div>
        </div>

        {/* Province */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <label className="block text-lg font-bold text-gray-800 mb-3">
            所在省份
          </label>
          <select
            value={settings.province}
            onChange={(e) => {
              const prov = PROVINCES.find((p) => p.value === e.target.value);
              updateSettings({
                province: e.target.value,
                city: prov?.cities[0]?.value || '',
              });
              showSaved();
            }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg text-gray-800 min-h-[48px] appearance-none"
          >
            {PROVINCES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <label className="block text-lg font-bold text-gray-800 mb-3">
            所在城市
          </label>
          <select
            value={settings.city}
            onChange={(e) => {
              updateSettings({ city: e.target.value });
              showSaved();
            }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg text-gray-800 min-h-[48px] appearance-none"
          >
            {cities.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-400 text-center">
          <p>所有设置保存在当前设备</p>
          <p>不需要登录，不会上传到服务器</p>
        </div>
      </div>
    </PageContainer>
  );
}
