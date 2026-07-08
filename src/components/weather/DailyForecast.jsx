import GlassCard from '../ui/GlassCard'
import WeatherIcon from './WeatherIcon'
import { useUnit } from '../../context/UnitContext'
import { formatTemperature } from '../../utils/unitConversions'
import { formatDayLabel } from '../../utils/dateTime'
import { describeWeatherCode } from '../../utils/weatherCodeMap'

const DAYS_TO_SHOW = 5

export default function DailyForecast({ days }) {
  const { unit } = useUnit()
  const upcoming = days.slice(0, DAYS_TO_SHOW)

  return (
    <div>
      <h2 className="font-heading mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">
        5-Day Forecast
      </h2>
      <div className="grid gap-3 sm:grid-cols-5">
        {upcoming.map((day, index) => {
          const { label } = describeWeatherCode(day.weatherCode)
          return (
            <GlassCard
              key={day.date}
              index={index}
              className="flex flex-row items-center justify-between gap-3 p-4 sm:flex-col sm:text-center"
            >
              <p className="text-sm font-medium text-white">{formatDayLabel(day.date, index)}</p>
              <WeatherIcon code={day.weatherCode} isDay size={36} />
              <p className="hidden text-xs text-slate-400 sm:block">{label}</p>
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">
                  {formatTemperature(day.tempMax, unit)}
                </span>{' '}
                / {formatTemperature(day.tempMin, unit)}
              </p>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
