import { useEffect, useState } from 'react'

/**
 * useState that persists its value to localStorage under `key`, and
 * initializes from whatever was previously stored (if anything).
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage unavailable (e.g. private browsing) — fail silently
    }
  }, [key, value])

  return [value, setValue]
}
