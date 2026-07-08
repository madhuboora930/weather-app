const GEOCODING_BASE_URL =
  import.meta.env.VITE_GEOCODING_BASE_URL ?? 'https://geocoding-api.open-meteo.com/v1'

const REVERSE_GEOCODING_BASE_URL =
  import.meta.env.VITE_REVERSE_GEOCODING_BASE_URL ?? 'https://api.bigdatacloud.net/data'

/**
 * Search for cities matching a name. Used to power the search bar's
 * autocomplete dropdown.
 */
export async function searchCities(query, { signal } = {}) {
  const url = new URL(`${GEOCODING_BASE_URL}/search`)
  url.searchParams.set('name', query)
  url.searchParams.set('count', '5')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')

  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`City search failed with status ${response.status}`)
  }

  const data = await response.json()
  return (data.results ?? []).map((result) => ({
    id: result.id,
    name: result.name,
    country: result.country,
    admin1: result.admin1 ?? null,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  }))
}

/**
 * Reverse-geocode coordinates (from the browser's Geolocation API) into a
 * human-readable city name. Uses BigDataCloud's free, key-less endpoint.
 */
export async function reverseGeocode(latitude, longitude) {
  const url = new URL(`${REVERSE_GEOCODING_BASE_URL}/reverse-geocode-client`)
  url.searchParams.set('latitude', latitude)
  url.searchParams.set('longitude', longitude)
  url.searchParams.set('localityLanguage', 'en')

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Reverse geocoding failed with status ${response.status}`)
  }

  const data = await response.json()
  return {
    name: data.city || data.locality || data.principalSubdivision || 'Your location',
    country: data.countryName ?? '',
    admin1: data.principalSubdivision ?? null,
    latitude,
    longitude,
  }
}
