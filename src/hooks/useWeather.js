import { useEffect, useState } from 'react'
import { fetchWeather } from '../services/weatherApi'

/**
 * Fetches current + hourly + daily weather for a `{ latitude, longitude }`
 * location. Re-fetches whenever the location changes, and cancels the
 * previous in-flight request so a slow response can never overwrite a
 * newer one. `refetch()` lets a retry button re-run the same request.
 */
export default function useWeather(location) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [retryToken, setRetryToken] = useState(0)

  useEffect(() => {
    if (!location) {
      setData(null)
      setError(null)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchWeather(location.latitude, location.longitude, { signal: controller.signal })
      .then((weather) => setData(weather))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError('Could not load weather for this location. Please try again.')
        setData(null)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [location, retryToken])

  const refetch = () => setRetryToken((prev) => prev + 1)

  return { data, loading, error, refetch }
}
