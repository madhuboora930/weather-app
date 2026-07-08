export function celsiusToFahrenheit(celsius) {
  return celsius * (9 / 5) + 32
}

export function formatTemperature(celsius, unit) {
  if (celsius === null || celsius === undefined) return '--'
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius
  return `${Math.round(value)}°`
}

export function kmhToMph(kmh) {
  return kmh * 0.621371
}

export function formatWindSpeed(kmh, unit) {
  if (kmh === null || kmh === undefined) return '--'
  const value = unit === 'fahrenheit' ? kmhToMph(kmh) : kmh
  const label = unit === 'fahrenheit' ? 'mph' : 'km/h'
  return `${Math.round(value)} ${label}`
}
