// Open-Meteo uses WMO weather interpretation codes.
// Reference: https://open-meteo.com/en/docs (see "WMO Weather interpretation codes")
// Each entry maps a code to a human label and a "condition" key used to
// pick an icon + background mood elsewhere in the app.

const CODE_TABLE = {
  0: { label: 'Clear sky', condition: 'clear' },
  1: { label: 'Mainly clear', condition: 'clear' },
  2: { label: 'Partly cloudy', condition: 'cloudy' },
  3: { label: 'Overcast', condition: 'overcast' },
  45: { label: 'Fog', condition: 'fog' },
  48: { label: 'Depositing rime fog', condition: 'fog' },
  51: { label: 'Light drizzle', condition: 'drizzle' },
  53: { label: 'Moderate drizzle', condition: 'drizzle' },
  55: { label: 'Dense drizzle', condition: 'drizzle' },
  56: { label: 'Light freezing drizzle', condition: 'drizzle' },
  57: { label: 'Dense freezing drizzle', condition: 'drizzle' },
  61: { label: 'Slight rain', condition: 'rain' },
  63: { label: 'Moderate rain', condition: 'rain' },
  65: { label: 'Heavy rain', condition: 'rain' },
  66: { label: 'Light freezing rain', condition: 'rain' },
  67: { label: 'Heavy freezing rain', condition: 'rain' },
  71: { label: 'Slight snow fall', condition: 'snow' },
  73: { label: 'Moderate snow fall', condition: 'snow' },
  75: { label: 'Heavy snow fall', condition: 'snow' },
  77: { label: 'Snow grains', condition: 'snow' },
  80: { label: 'Slight rain showers', condition: 'rain' },
  81: { label: 'Moderate rain showers', condition: 'rain' },
  82: { label: 'Violent rain showers', condition: 'rain' },
  85: { label: 'Slight snow showers', condition: 'snow' },
  86: { label: 'Heavy snow showers', condition: 'snow' },
  95: { label: 'Thunderstorm', condition: 'storm' },
  96: { label: 'Thunderstorm with slight hail', condition: 'storm' },
  99: { label: 'Thunderstorm with heavy hail', condition: 'storm' },
}

const FALLBACK = { label: 'Unknown', condition: 'cloudy' }

export function describeWeatherCode(code) {
  return CODE_TABLE[code] ?? FALLBACK
}
