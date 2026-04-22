import { SOURCE_LABELS, type SourcePlatform } from '@/types';

interface SourceInfoProps {
  platform: SourcePlatform;
  title?: string;
  url?: string;
}

export default function SourceInfo({ platform, title, url }: SourceInfoProps) {
  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-2">来源信息</h3>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-base font-medium text-gray-700">
            {SOURCE_LABELS[platform] || platform}
          </span>
          {title && (
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{title}</p>
          )}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm font-medium min-h-[40px] flex items-center active:bg-gray-300 transition-colors"
          >
            查看原帖
          </a>
        )}
      </div>
    </div>
  );
}
