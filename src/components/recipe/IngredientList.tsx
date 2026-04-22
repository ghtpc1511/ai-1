import type { Ingredient } from '@/types';

export default function IngredientList({ ingredients, priceText }: { ingredients: Ingredient[]; priceText: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-900">食材清单</h2>
        <span className="text-base font-medium text-orange-500">{priceText}</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {ingredients.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 ${
              i < ingredients.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base text-gray-800 font-medium">{item.name}</span>
              {item.isOptional && (
                <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">可选</span>
              )}
            </div>
            <span className="text-base text-gray-500">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
