import { useUnit } from '../../context/UnitContext'

export default function UnitToggle() {
  const { unit, toggleUnit } = useUnit()

  return (
    <button
      type="button"
      onClick={toggleUnit}
      aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
      className="glass flex items-center rounded-full p-1 text-sm font-semibold"
    >
      <span
        className={`rounded-full px-3 py-1.5 transition-colors ${
          unit === 'celsius' ? 'bg-gradient-to-r from-sky to-indigo text-ink' : 'text-slate-400'
        }`}
      >
        °C
      </span>
      <span
        className={`rounded-full px-3 py-1.5 transition-colors ${
          unit === 'fahrenheit' ? 'bg-gradient-to-r from-sky to-indigo text-ink' : 'text-slate-400'
        }`}
      >
        °F
      </span>
    </button>
  )
}
