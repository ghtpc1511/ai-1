import { HANGZHOU_ITINERARIES } from '@/data/itineraries';
import { ItineraryDetailClient } from './client';

export function generateStaticParams() {
  return HANGZHOU_ITINERARIES.map(i => ({ id: i.id }));
}

export default async function ItineraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const itinerary = HANGZHOU_ITINERARIES.find(i => i.id === id);

  if (!itinerary) {
    return (
      <div className="px-4 pt-20 text-center text-gray-500">
        <p className="text-lg">线路未找到</p>
      </div>
    );
  }

  return <ItineraryDetailClient itinerary={itinerary} />;
}
