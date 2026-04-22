export default function RecipeTips({ tips }: { tips: string[] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-3">注意事项</h2>
      <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4">
        <ul className="space-y-2.5">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 text-amber-500 text-lg leading-none mt-0.5">⚠</span>
              <span className="text-base text-amber-900 leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
