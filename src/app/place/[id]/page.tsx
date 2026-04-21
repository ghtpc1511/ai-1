import { HANGZHOU_PLACES } from '@/data/places';
import { PlaceDetailClient } from './client';

export function generateStaticParams() {
  return HANGZHOU_PLACES.map(p => ({ id: p.id }));
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const place = HANGZHOU_PLACES.find(p => p.id === id);

  if (!place) {
    return (
      <div className="px-4 pt-20 text-center text-gray-500">
        <p className="text-lg">地点未找到</p>
      </div>
    );
  }

  return <PlaceDetailClient place={place} />;
}
