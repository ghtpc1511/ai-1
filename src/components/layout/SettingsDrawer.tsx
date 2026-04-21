'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { HANGZHOU_DISTRICTS } from '@/data/districts';
import { MapPin, RefreshCw } from 'lucide-react';
import type { UpdateFrequency } from '@/types';

interface SettingsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FREQ_OPTIONS: { value: UpdateFrequency; label: string }[] = [
  { value: 'DAILY', label: '每日更新' },
  { value: 'WEEKLY', label: '每周更新' },
  { value: 'MONTHLY', label: '每月更新' },
  { value: 'MANUAL', label: '手动更新' },
];

export function SettingsDrawer({ open, onOpenChange }: SettingsDrawerProps) {
  const { preferences, updatePreferences, requestGeolocation, triggerManualUpdate, location } = useApp();

  const handleBirthChange = (field: 'year' | 'month' | 'day', value: string | null) => {
    if (!value) return;
    const parts = preferences.babyBirthDate.split('-');
    if (field === 'year') parts[0] = value;
    if (field === 'month') parts[1] = value.padStart(2, '0');
    if (field === 'day') parts[2] = value.padStart(2, '0');
    updatePreferences({ babyBirthDate: parts.join('-') });
  };

  const birthParts = preferences.babyBirthDate.split('-');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => String(currentYear - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-lg">设置</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* 宝宝出生日期 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">宝宝出生日期</label>
            <div className="flex gap-2">
              <Select value={birthParts[0]} onValueChange={v => handleBirthChange('year', v)}>
                <SelectTrigger className="flex-1 h-11 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {years.map(y => <SelectItem key={y} value={y}>{y}年</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={String(parseInt(birthParts[1]))} onValueChange={v => handleBirthChange('month', v)}>
                <SelectTrigger className="w-20 h-11 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {months.map(m => <SelectItem key={m} value={m}>{m}月</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={String(parseInt(birthParts[2]))} onValueChange={v => handleBirthChange('day', v)}>
                <SelectTrigger className="w-20 h-11 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {days.map(d => <SelectItem key={d} value={d}>{d}日</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 行政区选择 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">所在行政区</label>
            <Select
              value={preferences.districtId || 'all'}
              onValueChange={v => updatePreferences({ districtId: v === 'all' ? null : v })}
            >
              <SelectTrigger className="h-11 text-base"><SelectValue placeholder="选择行政区" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部区域</SelectItem>
                {HANGZHOU_DISTRICTS.map(d => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 定位 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">定位</label>
            <Button
              variant="outline"
              className="w-full h-11 text-base justify-start gap-2"
              onClick={requestGeolocation}
            >
              <MapPin className="w-4 h-4" />
              {location.permissionStatus === 'granted' ? '已定位' :
               location.permissionStatus === 'loading' ? '定位中...' :
               '点击获取定位'}
            </Button>
          </div>

          {/* 更新频率 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">更新频率</label>
            <Select
              value={preferences.updateFrequency}
              onValueChange={v => updatePreferences({ updateFrequency: v as UpdateFrequency })}
            >
              <SelectTrigger className="h-11 text-base"><SelectValue /></SelectTrigger>
              <SelectContent>
                {FREQ_OPTIONS.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 手动更新 */}
          <Button
            className="w-full h-12 text-base font-semibold gap-2"
            onClick={() => {
              triggerManualUpdate();
              onOpenChange(false);
            }}
          >
            <RefreshCw className="w-4 h-4" />
            立即更新推荐
          </Button>

          <p className="text-xs text-gray-400 text-center">
            最近更新: {new Date(preferences.lastUpdatedAt).toLocaleString('zh-CN')}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
