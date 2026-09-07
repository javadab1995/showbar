type Coordinates = {
  lat: number;
  lng: number;
};

export function calculateDistance(from: Coordinates, to: Coordinates): number {
  const earthRadius = 6371;

  const lat1 = (from.lat * Math.PI) / 180;

  const lat2 = (to.lat * Math.PI) / 180;

  const deltaLat = ((to.lat - from.lat) * Math.PI) / 180;

  const deltaLng = ((to.lng - from.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}
