import type { RecipeStep } from '@/types';

export default function RecipeSteps({ steps }: { steps: RecipeStep[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">做法步骤</h2>
      {steps.map((step) => (
        <div key={step.stepNumber} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Step Image */}
          {step.stepImage && step.stepImage !== '/placeholder.svg' && (
            <div className="aspect-video bg-orange-50">
              <img
                src={step.stepImage}
                alt={step.stepTitle}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* Step Number */}
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-500 text-white text-sm font-bold rounded-full">
                {step.stepNumber}
              </span>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {step.stepTitle}
                </h3>
                <p className="mt-1.5 text-base text-gray-600 leading-relaxed">
                  {step.stepDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
