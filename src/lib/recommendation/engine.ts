import type { Place, Itinerary, Season, ScoreBreakdown, ScoredPlace, ScoredItinerary } from '@/types';
import { getCurrentSeason, haversineDistance } from '@/lib/utils';

// ============================================================
// 年龄评分 (满分30)
// ============================================================
function scoreAge(babyMonths: number, minAge: number, maxAge: number): number {
  if (babyMonths < minAge || babyMonths > maxAge) {
    // 超出范围，但如果很接近给一些分
    const distToMin = Math.abs(babyMonths - minAge);
    const distToMax = Math.abs(babyMonths - maxAge);
    const closest = Math.min(distToMin, distToMax);
    if (closest <= 2) return 10;
    if (closest <= 4) return 5;
    return 0;
  }
  // 在范围内
  const range = maxAge - minAge;
  if (range === 0) return 30;
  const center = minAge + range / 2;
  const distFromCenter = Math.abs(babyMonths - center);
  const normalizedDist = distFromCenter / (range / 2);
  return Math.round(30 - normalizedDist * 10);
}

// ============================================================
// 季节评分 (满分20)
// ============================================================
function scoreSeason(suitableSeasons: Season[], indoorOutdoor: string, currentSeason: Season): number {
  if (suitableSeasons.includes(currentSeason)) return 20;
  if (indoorOutdoor === 'INDOOR') return 14;
  if (indoorOutdoor === 'BOTH') return 10;
  return 5;
}

// ============================================================
// 距离评分 (满分20)
// ============================================================
function scoreDistance(
  placeLat: number, placeLng: number,
  userLat: number | null, userLng: number | null,
  districtMatch: boolean
): number {
  if (districtMatch) return 18;
  if (userLat === null || userLng === null) return 10;
  const km = haversineDistance(userLat, userLng, placeLat, placeLng);
  if (km <= 3) return 20;
  if (km <= 8) return 16;
  if (km <= 15) return 12;
  if (km <= 30) return 8;
  return 4;
}

// ============================================================
// 热度评分 (满分15)
// ============================================================
function scorePopularity(popularity: number): number {
  return Math.round((popularity / 100) * 15);
}

// ============================================================
// 无障碍评分 (满分15)
// ============================================================
function scoreAccessibility(place: { strollerFriendly: boolean; elderFriendly: boolean; hasNursingRoom: boolean; hasRestroom: boolean; rainFriendly: boolean }): number {
  let s = 0;
  if (place.strollerFriendly) s += 4;
  if (place.elderFriendly) s += 4;
  if (place.hasNursingRoom) s += 3;
  if (place.hasRestroom) s += 2;
  if (place.rainFriendly) s += 2;
  return Math.min(s, 15);
}

// ============================================================
// 综合评分
// ============================================================
function computeBreakdown(
  ageScore: number,
  seasonScore: number,
  distanceScore: number,
  popularityScore: number,
  accessibilityScore: number
): ScoreBreakdown {
  return {
    ageScore,
    seasonScore,
    distanceScore,
    popularityScore,
    accessibilityScore,
    total: ageScore + seasonScore + distanceScore + popularityScore + accessibilityScore,
  };
}

// ============================================================
// 地点评分
// ============================================================
export function scorePlaces(
  places: Place[],
  babyMonths: number,
  userLat: number | null,
  userLng: number | null,
  userDistrictId: string | null
): ScoredPlace[] {
  const season = getCurrentSeason();

  return places
    .map((place) => {
      const districtMatch = userDistrictId ? place.districtId === userDistrictId : false;
      const ageS = scoreAge(babyMonths, place.minAgeMonths, place.maxAgeMonths);
      const seasonS = scoreSeason(place.suitableSeasons, place.indoorOutdoor, season);
      const distS = scoreDistance(place.lat, place.lng, userLat, userLng, districtMatch);
      const popS = scorePopularity(place.popularity);
      const accS = scoreAccessibility(place);
      const breakdown = computeBreakdown(ageS, seasonS, distS, popS, accS);

      let distanceKm: number | undefined;
      if (userLat !== null && userLng !== null) {
        distanceKm = haversineDistance(userLat, userLng, place.lat, place.lng);
      }

      return {
        ...place,
        score: breakdown.total,
        scoreBreakdown: breakdown,
        distanceKm,
      };
    })
    .sort((a, b) => b.score - a.score);
}

// ============================================================
// 行程评分
// ============================================================
export function scoreItineraries(
  itineraries: Itinerary[],
  babyMonths: number,
  userLat: number | null,
  userLng: number | null,
  userDistrictId: string | null
): ScoredItinerary[] {
  const season = getCurrentSeason();

  return itineraries
    .map((itin) => {
      const districtMatch = userDistrictId ? itin.districtId === userDistrictId : false;
      const ageS = scoreAge(babyMonths, itin.minAgeMonths, itin.maxAgeMonths);
      const seasonS = scoreSeason(itin.suitableSeasons, 'BOTH', season);
      const distS = districtMatch ? 18 : 10;
      const popS = scorePopularity(itin.popularity);
      const accS = (itin.strollerFriendly ? 5 : 0) + (itin.elderFriendly ? 5 : 0) + (itin.rainFriendly ? 5 : 0);
      const breakdown = computeBreakdown(ageS, seasonS, distS, popS, Math.min(accS, 15));

      return {
        ...itin,
        score: breakdown.total,
        scoreBreakdown: breakdown,
      };
    })
    .sort((a, b) => b.score - a.score);
}
