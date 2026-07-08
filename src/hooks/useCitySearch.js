import { useEffect, useState } from 'react'
import useDebounce from './useDebounce'
import { searchCities } from '../services/geocodingApi'

const MIN_QUERY_LENGTH = 2

/**
 * Debounces a raw search query and turns it into a list of matching
 * cities from the geocoding API. Cancels in-flight requests when the
 * query changes again before the previous one resolves.
 */
export default function useCitySearch(query) {
  const debouncedQuery = useDebounce(query, 400)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const trimmed = debouncedQuery.trim()
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setResults([])
      setError(null)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    searchCities(trimmed, { signal: controller.signal })
      .then((cities) => setResults(cities))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError('Could not search for that city. Please try again.')
        setResults([])
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [debouncedQuery])

  return { results, loading, error }
}
