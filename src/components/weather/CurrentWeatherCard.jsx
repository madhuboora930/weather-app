import { motion } from 'framer-motion'
import WeatherIcon from './WeatherIcon'
import { useUnit } from '../../context/UnitContext'
import { formatTemperature } from '../../utils/unitConversions'
import { describeWeatherCode } from '../../utils/weatherCodeMap'

export default function CurrentWeatherCard({ location, current }) {
  const { unit } = useUnit()
  const { label } = describeWeatherCode(current.weatherCode)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass glow-border rounded-3xl p-8 text-center sm:p-10"
    >
      <p className="font-heading text-lg font-medium text-white">
        {location.name}
        {location.admin1 ? `, ${location.admin1}` : ''}
      </p>
      <p className="text-sm text-slate-400">{location.country}</p>

      <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
        <WeatherIcon code={current.weatherCode} isDay={current.isDay} size={96} />
        <div>
          <p className="font-heading text-6xl font-bold text-gradient sm:text-7xl">
            {formatTemperature(current.temperature, unit)}
          </p>
          <p className="mt-1 text-slate-300">{label}</p>
          <p className="text-sm text-slate-500">
            Feels like {formatTemperature(current.apparentTemperature, unit)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
