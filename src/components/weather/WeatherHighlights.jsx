import { WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset } from 'react-icons/wi'
import { FiEye, FiSun } from 'react-icons/fi'
import GlassCard from '../ui/GlassCard'
import { useUnit } from '../../context/UnitContext'
import { formatWindSpeed } from '../../utils/unitConversions'
import { describeUvIndex } from '../../utils/uvIndex'
import { formatClockTime } from '../../utils/dateTime'

export default function WeatherHighlights({ current, today }) {
  const { unit } = useUnit()
  const visibilityKm = current.visibilityMeters ? (current.visibilityMeters / 1000).toFixed(1) : null

  const items = [
    {
      key: 'humidity',
      label: 'Humidity',
      icon: WiHumidity,
      value: current.humidity !== null ? `${Math.round(current.humidity)}%` : '--',
    },
    {
      key: 'wind',
      label: 'Wind Speed',
      icon: WiStrongWind,
      value: formatWindSpeed(current.windSpeed, unit),
    },
    {
      key: 'pressure',
      label: 'Pressure',
      icon: WiBarometer,
      value: current.pressure ? `${Math.round(current.pressure)} hPa` : '--',
    },
    {
      key: 'visibility',
      label: 'Visibility',
      icon: FiEye,
      value: visibilityKm ? `${visibilityKm} km` : '--',
    },
    {
      key: 'uv',
      label: 'UV Index',
      icon: FiSun,
      value: current.uvIndex !== null ? `${Math.round(current.uvIndex)} · ${describeUvIndex(current.uvIndex)}` : '--',
    },
    {
      key: 'sun',
      label: 'Sunrise & Sunset',
      icon: WiSunrise,
      value: `${formatClockTime(today?.sunrise)} / ${formatClockTime(today?.sunset)}`,
      secondaryIcon: WiSunset,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map(({ key, label, icon: Icon, secondaryIcon: SecondaryIcon, value }, index) => (
        <GlassCard key={key} index={index} className="flex flex-col items-start gap-2 p-4">
          <div className="flex items-center gap-1 text-slate-400">
            <Icon size={22} />
            {SecondaryIcon && <SecondaryIcon size={22} />}
          </div>
          <p className="text-xs tracking-wide text-slate-400 uppercase">{label}</p>
          <p className="font-heading text-lg font-semibold text-white">{value}</p>
        </GlassCard>
      ))}
    </div>
  )
}
