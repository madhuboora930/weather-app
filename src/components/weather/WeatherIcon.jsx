import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightPartlyCloudy,
  WiCloudy,
  WiDayFog,
  WiNightFog,
  WiDaySprinkle,
  WiNightSprinkle,
  WiDayRain,
  WiNightRain,
  WiDaySnow,
  WiNightSnow,
  WiDayThunderstorm,
  WiNightThunderstorm,
} from 'react-icons/wi'
import { describeWeatherCode } from '../../utils/weatherCodeMap'

const ICON_MAP = {
  'clear-day': { Icon: WiDaySunny, color: '#fbbf24', animation: 'animate-spin-slow' },
  'clear-night': { Icon: WiNightClear, color: '#818cf8', animation: 'animate-float' },
  'cloudy-day': { Icon: WiDayCloudy, color: '#94a3b8', animation: 'animate-float' },
  'cloudy-night': { Icon: WiNightPartlyCloudy, color: '#94a3b8', animation: 'animate-float' },
  'overcast-day': { Icon: WiCloudy, color: '#94a3b8', animation: 'animate-float' },
  'overcast-night': { Icon: WiCloudy, color: '#94a3b8', animation: 'animate-float' },
  'fog-day': { Icon: WiDayFog, color: '#cbd5e1', animation: 'animate-float' },
  'fog-night': { Icon: WiNightFog, color: '#cbd5e1', animation: 'animate-float' },
  'drizzle-day': { Icon: WiDaySprinkle, color: '#38bdf8', animation: 'animate-float' },
  'drizzle-night': { Icon: WiNightSprinkle, color: '#38bdf8', animation: 'animate-float' },
  'rain-day': { Icon: WiDayRain, color: '#38bdf8', animation: 'animate-float' },
  'rain-night': { Icon: WiNightRain, color: '#38bdf8', animation: 'animate-float' },
  'snow-day': { Icon: WiDaySnow, color: '#e2e8f0', animation: 'animate-float' },
  'snow-night': { Icon: WiNightSnow, color: '#e2e8f0', animation: 'animate-float' },
  'storm-day': { Icon: WiDayThunderstorm, color: '#fb7185', animation: 'animate-float' },
  'storm-night': { Icon: WiNightThunderstorm, color: '#fb7185', animation: 'animate-float' },
}

export default function WeatherIcon({ code, isDay = true, size = 48, animated = true, className = '' }) {
  const { condition } = describeWeatherCode(code)
  const key = `${condition}-${isDay ? 'day' : 'night'}`
  const entry = ICON_MAP[key] ?? ICON_MAP['cloudy-day']
  const { Icon, color, animation } = entry

  return (
    <Icon
      size={size}
      style={{ color }}
      className={`${animated ? animation : ''} ${className}`}
      aria-hidden="true"
    />
  )
}
