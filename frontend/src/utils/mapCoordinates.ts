import type { Event } from '@/entities/types'

export interface MapCoordinates {
  top: number
  left: number
}

export interface Location {
  name: string
  lat: number
  lng: number
}

// Location mapping table with real lat/lng coordinates
export const LOCATIONS: Location[] = [
  { name: 'Suez Canal', lat: 30.0444, lng: 32.5599 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Taiwan Strait', lat: 24.0, lng: 119.5 },
  { name: 'Panama Canal', lat: 9.08, lng: -79.68 },
  { name: 'Rotterdam', lat: 51.9244, lng: 4.4777 },
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
]

/**
 * Convert latitude/longitude to percentage coordinates for equirectangular projection
 * Formula:
 * left = ((lng + 180) / 360) * 100
 * top = ((90 - lat) / 180) * 100
 */
export const getCoordinatesFromLatLng = (lat: number, lng: number): MapCoordinates => {
  const left = ((lng + 180) / 360) * 100
  const top = ((90 - lat) / 180) * 100
  return { top, left }
}

/**
 * Get coordinates for an event based on location keywords in zoneName
 */
export const getEventCoordinates = (event: Event): MapCoordinates => {
  const text = event.zoneName.toLowerCase()

  // Check against location mapping table
  for (const location of LOCATIONS) {
    if (text.includes(location.name.toLowerCase())) {
      return getCoordinatesFromLatLng(location.lat, location.lng)
    }
  }

  // Fallback to keyword matching for backward compatibility
  if (text.includes('suez') || text.includes('egypt')) return getCoordinatesFromLatLng(30.0444, 32.5599)
  if (text.includes('singapore')) return getCoordinatesFromLatLng(1.3521, 103.8198)
  if (text.includes('taiwan') || text.includes('strait')) return getCoordinatesFromLatLng(24.0, 119.5)
  if (text.includes('panama')) return getCoordinatesFromLatLng(9.08, -79.68)
  if (text.includes('rotterdam') || text.includes('netherlands') || text.includes('europe')) return getCoordinatesFromLatLng(51.9244, 4.4777)
  if (text.includes('shanghai') || text.includes('china')) return getCoordinatesFromLatLng(31.2304, 121.4737)
  if (text.includes('los angeles') || text.includes('california') || text.includes('usa')) return getCoordinatesFromLatLng(34.0522, -118.2437)
  if (text.includes('new york') || text.includes('east coast')) return getCoordinatesFromLatLng(40.7128, -74.0060)
  if (text.includes('japan') || text.includes('tokyo')) return getCoordinatesFromLatLng(35.6762, 139.6503)
  if (text.includes('india') || text.includes('mumbai')) return getCoordinatesFromLatLng(19.0760, 72.8777)
  if (text.includes('brazil') || text.includes('south america')) return getCoordinatesFromLatLng(-14.2350, -51.9253)
  if (text.includes('australia') || text.includes('sydney')) return getCoordinatesFromLatLng(-33.8688, 151.2093)
  if (text.includes('africa')) return getCoordinatesFromLatLng(0, 20)
  if (text.includes('middle east') || text.includes('gulf')) return getCoordinatesFromLatLng(25, 55)

  // Default center position
  return { top: 50, left: 50 }
}
