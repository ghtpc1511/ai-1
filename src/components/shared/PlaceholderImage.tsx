'use client';

import { getCategoryGradient, getCategoryEmoji, type PlaceCategoryForColor } from '@/lib/utils';

interface PlaceholderImageProps {
  category: PlaceCategoryForColor;
  colorSeed: string;
  variant?: 'hero' | 'featured' | 'list';
  className?: string;
}

const aspectMap = {
  hero: 'aspect-[16/9]',
  featured: 'aspect-[4/3]',
  list: 'aspect-square',
};

export function PlaceholderImage({ category, colorSeed, variant = 'featured', className = '' }: PlaceholderImageProps) {
  const gradient = getCategoryGradient(category, colorSeed);
  const emoji = getCategoryEmoji(category);
  const aspect = aspectMap[variant];

  return (
    <div
      className={`bg-gradient-to-br ${gradient} ${aspect} rounded-xl flex items-center justify-center relative overflow-hidden ${className}`}
    >
      {/* 装饰圆点 */}
      <div className="absolute top-2 right-2 w-12 h-12 bg-white/10 rounded-full" />
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/5 rounded-full" />
      <span className="text-4xl drop-shadow-md" role="img">{emoji}</span>
    </div>
  );
}
