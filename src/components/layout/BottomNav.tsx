'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: '首页', icon: '🏠' },
  { href: '/recipes', label: '食谱', icon: '🍳' },
  { href: '/favorites', label: '收藏', icon: '❤️' },
  { href: '/growth', label: '知识', icon: '📖' },
  { href: '/settings', label: '设置', icon: '⚙️' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center py-2 pt-3 min-h-[56px] transition-colors ${
                isActive
                  ? 'text-orange-500'
                  : 'text-gray-400 active:text-gray-600'
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-orange-500' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
