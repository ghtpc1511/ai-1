'use client';

import type { GrowthKnowledge } from '@/types';
import { useBabyAge } from '@/hooks/useSettings';

interface HeightWeightTableProps {
  data: GrowthKnowledge[];
}

export default function HeightWeightTable({ data }: HeightWeightTableProps) {
  const { ageMonths } = useBabyAge();

  if (!data || data.length === 0) {
    return <p className="text-base text-gray-500 text-center py-4">暂无数据</p>;
  }

  return (
    <div>
      <div className="bg-amber-50 rounded-xl p-3 mb-4 text-sm text-amber-800">
        数据仅供家庭参考，不能替代医生判断
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-3 font-bold text-gray-700 rounded-tl-xl">年龄</th>
              <th className="text-left py-3 px-3 font-bold text-gray-700">身高(cm)</th>
              <th className="text-left py-3 px-3 font-bold text-gray-700 rounded-tr-xl">体重(kg)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const isCurrentAge = ageMonths >= item.minAgeMonths && ageMonths <= item.maxAgeMonths;
              return (
                <tr
                  key={item.id}
                  className={`border-b border-gray-50 ${
                    isCurrentAge ? 'bg-orange-50 font-bold' : ''
                  }`}
                >
                  <td className="py-3 px-3 text-gray-800">
                    {item.title}
                    {isCurrentAge && (
                      <span className="ml-1 text-xs text-orange-500 font-bold">当前</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-gray-600" dangerouslySetInnerHTML={{ __html: item.content.split('|')[0] || '' }} />
                  <td className="py-3 px-3 text-gray-600" dangerouslySetInnerHTML={{ __html: item.content.split('|')[1] || '' }} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
