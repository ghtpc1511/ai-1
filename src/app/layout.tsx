import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SettingsProvider } from '@/contexts/SettingsContext';
import BottomNav from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: '宝宝菜谱 - 每周为宝宝推荐最合适的食谱',
  description: '根据宝宝年龄、季节自动推荐简单家常的宝宝食谱，适合老人在家制作',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FF8C42',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased text-gray-900">
        <SettingsProvider>
          {children}
          <BottomNav />
        </SettingsProvider>
      </body>
    </html>
  );
}
