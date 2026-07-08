import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const UnitContext = createContext(null)

const STORAGE_KEY = 'weather-app:unit'

/**
 * Provides the app-wide temperature/wind unit preference ('celsius' |
 * 'fahrenheit') so any component can read or toggle it without prop
 * drilling through every layer between App and, say, a forecast card
 * three levels deep.
 */
export function UnitProvider({ children }) {
  const [unit, setUnit] = useLocalStorage(STORAGE_KEY, 'celsius')

  const value = useMemo(
    () => ({
      unit,
      toggleUnit: () => setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius')),
    }),
    [unit, setUnit],
  )

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>
}

export function useUnit() {
  const context = useContext(UnitContext)
  if (!context) {
    throw new Error('useUnit must be used within a UnitProvider')
  }
  return context
}
