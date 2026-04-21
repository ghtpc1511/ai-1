'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, Map, Settings } from 'lucide-react';
import { useState } from 'react';
import { SettingsDrawer } from './SettingsDrawer';

const navItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/weekly', label: '本周', icon: CalendarDays },
  { href: '/monthly', label: '月度', icon: Map },
];

export function BottomNav() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-lg mx-auto flex items-center justify-around h-14">
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 min-w-[56px] rounded-xl transition-colors ${
                  active ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <item.icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[11px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex flex-col items-center gap-0.5 px-4 py-1.5 min-w-[56px] rounded-xl text-gray-500 transition-colors"
          >
            <Settings className="w-5 h-5" strokeWidth={2} />
            <span className="text-[11px] font-medium">设置</span>
          </button>
        </div>
      </nav>
      <SettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
