import { motion } from 'framer-motion'
import WeatherIcon from './WeatherIcon'
import { useUnit } from '../../context/UnitContext'
import { formatTemperature } from '../../utils/unitConversions'
import { formatHour } from '../../utils/dateTime'

export default function HourlyForecast({ hours, isDay }) {
  const { unit } = useUnit()

  return (
    <div>
      <h2 className="font-heading mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">
        Hourly Forecast
      </h2>
      <div className="glass scrollbar-none flex gap-3 overflow-x-auto rounded-2xl p-4">
        {hours.map((hour, index) => (
          <motion.div
            key={hour.time}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="flex min-w-[64px] flex-col items-center gap-2 rounded-xl px-2 py-3 transition-colors hover:bg-white/5"
          >
            <span className="text-xs text-slate-400">{index === 0 ? 'Now' : formatHour(hour.time)}</span>
            <WeatherIcon code={hour.weatherCode} isDay={isDay} size={32} />
            <span className="text-sm font-semibold text-white">
              {formatTemperature(hour.temperature, unit)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
