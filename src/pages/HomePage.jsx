import { useState } from 'react'
import Header from '../components/layout/Header'
import SearchBar from '../components/weather/SearchBar'
import RecentSearches from '../components/weather/RecentSearches'
import LocationButton from '../components/weather/LocationButton'
import CurrentWeatherCard from '../components/weather/CurrentWeatherCard'
import WeatherHighlights from '../components/weather/WeatherHighlights'
import HourlyForecast from '../components/weather/HourlyForecast'
import DailyForecast from '../components/weather/DailyForecast'
import WeatherSkeleton from '../components/weather/WeatherSkeleton'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import useWeather from '../hooks/useWeather'
import useRecentSearches from '../hooks/useRecentSearches'

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const { data, loading, error, refetch } = useWeather(selectedLocation)
  const { recentSearches, addSearch, clearSearches } = useRecentSearches()

  const handleSelectLocation = (location) => {
    setSelectedLocation(location)
    addSearch(location)
  }

  const statusMessage = loading
    ? `Loading weather for ${selectedLocation?.name}…`
    : error
      ? error
      : data && selectedLocation
        ? `Weather loaded for ${selectedLocation.name}.`
        : ''

  return (
    <div className="min-h-screen px-4 pt-6 pb-16 sm:px-6">
      <p className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </p>

      <Header />

      <main className="mx-auto mt-10 flex max-w-4xl flex-col items-center">
        <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <SearchBar onSelectCity={handleSelectLocation} />
          <LocationButton onLocationDetected={handleSelectLocation} />
        </div>

        <RecentSearches
          searches={recentSearches}
          onSelect={handleSelectLocation}
          onClear={clearSearches}
        />

        <div className="mt-10 w-full">
          {!selectedLocation && <EmptyState />}

          {selectedLocation && loading && <WeatherSkeleton />}

          {selectedLocation && !loading && error && (
            <ErrorState message={error} onRetry={refetch} />
          )}

          {selectedLocation && !loading && !error && data && (
            <div className="space-y-6">
              <CurrentWeatherCard location={selectedLocation} current={data.current} />
              <WeatherHighlights current={data.current} today={data.daily[0]} />
              <HourlyForecast hours={data.hourly} isDay={data.current.isDay} />
              <DailyForecast days={data.daily} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
