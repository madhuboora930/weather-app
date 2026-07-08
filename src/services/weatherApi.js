const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL ?? 'https://api.open-meteo.com/v1'

const CURRENT_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'weather_code',
  'pressure_msl',
  'wind_speed_10m',
  'wind_direction_10m',
].join(',')

const HOURLY_FIELDS = [
  'temperature_2m',
  'weather_code',
  'precipitation_probability',
  'uv_index',
  'visibility',
].join(',')

const DAILY_FIELDS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'sunrise',
  'sunset',
  'uv_index_max',
  'precipitation_probability_max',
].join(',')

/**
 * Fetch current conditions + hourly + daily forecast for a location, and
 * normalize the response into a shape the UI can consume directly.
 */
export async function fetchWeather(latitude, longitude, { signal } = {}) {
  const url = new URL(`${WEATHER_BASE_URL}/forecast`)
  url.searchParams.set('latitude', latitude)
  url.searchParams.set('longitude', longitude)
  url.searchParams.set('current', CURRENT_FIELDS)
  url.searchParams.set('hourly', HOURLY_FIELDS)
  url.searchParams.set('daily', DAILY_FIELDS)
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('forecast_days', '7')

  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Weather request failed with status ${response.status}`)
  }

  const data = await response.json()
  return normalizeWeatherResponse(data)
}

function normalizeWeatherResponse(data) {
  const currentTime = data.current.time
  const hourlyStartIndex = data.hourly.time.indexOf(currentTime)
  const sliceStart = hourlyStartIndex === -1 ? 0 : hourlyStartIndex

  const hourly = data.hourly.time
    .slice(sliceStart, sliceStart + 24)
    .map((time, i) => {
      const index = sliceStart + i
      return {
        time,
        temperature: data.hourly.temperature_2m[index],
        weatherCode: data.hourly.weather_code[index],
        precipitationProbability: data.hourly.precipitation_probability[index],
        uvIndex: data.hourly.uv_index[index],
        visibilityMeters: data.hourly.visibility[index],
      }
    })

  const daily = data.daily.time.map((date, index) => ({
    date,
    weatherCode: data.daily.weather_code[index],
    tempMax: data.daily.temperature_2m_max[index],
    tempMin: data.daily.temperature_2m_min[index],
    sunrise: data.daily.sunrise[index],
    sunset: data.daily.sunset[index],
    uvIndexMax: data.daily.uv_index_max[index],
    precipitationProbabilityMax: data.daily.precipitation_probability_max[index],
  }))

  return {
    current: {
      time: currentTime,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      isDay: data.current.is_day === 1,
      weatherCode: data.current.weather_code,
      pressure: data.current.pressure_msl,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      visibilityMeters: hourly[0]?.visibilityMeters ?? null,
      uvIndex: hourly[0]?.uvIndex ?? null,
    },
    hourly,
    daily,
    timezone: data.timezone,
  }
}
