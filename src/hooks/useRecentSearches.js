import useLocalStorage from './useLocalStorage'

const STORAGE_KEY = 'weather-app:recent-searches'
const MAX_ITEMS = 5

/**
 * Keeps a small, deduplicated, most-recent-first list of searched
 * locations in localStorage so it survives page reloads.
 */
export default function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useLocalStorage(STORAGE_KEY, [])

  const addSearch = (location) => {
    setRecentSearches((prev) => {
      const withoutDuplicate = prev.filter(
        (item) => !(item.name === location.name && item.country === location.country),
      )
      return [location, ...withoutDuplicate].slice(0, MAX_ITEMS)
    })
  }

  const clearSearches = () => setRecentSearches([])

  return { recentSearches, addSearch, clearSearches }
}
