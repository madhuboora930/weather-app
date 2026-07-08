import { useState } from 'react'

/**
 * Thin promise-based wrapper around the browser's Geolocation API.
 * Nothing runs automatically — `requestLocation()` is only called when the
 * user explicitly clicks a "use my location" button, so we never trigger a
 * surprise permission prompt on page load.
 */
export default function useGeolocation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const requestLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const message = 'Geolocation is not supported by this browser.'
        setError(message)
        reject(new Error(message))
        return
      }

      setLoading(true)
      setError(null)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false)
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (geoError) => {
          setLoading(false)
          const message =
            geoError.code === geoError.PERMISSION_DENIED
              ? 'Location permission denied.'
              : 'Could not determine your location.'
          setError(message)
          reject(new Error(message))
        },
        { timeout: 10000 },
      )
    })
  }

  return { loading, error, requestLocation }
}
