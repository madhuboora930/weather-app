import { FiClock, FiX } from 'react-icons/fi'

export default function RecentSearches({ searches, onSelect, onClear }) {
  if (searches.length === 0) return null

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <span className="flex items-center gap-1.5 text-xs text-slate-500">
        <FiClock size={12} /> Recent:
      </span>
      {searches.map((city) => (
        <button
          key={`${city.name}-${city.country}`}
          type="button"
          onClick={() => onSelect(city)}
          className="glass rounded-full px-3 py-1 text-xs text-slate-300 transition-all hover:-translate-y-0.5 hover:text-white"
        >
          {city.name}
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        aria-label="Clear recent searches"
        className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose"
      >
        <FiX size={12} /> Clear
      </button>
    </div>
  )
}
