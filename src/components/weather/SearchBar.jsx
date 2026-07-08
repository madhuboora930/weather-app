import { useRef, useState } from 'react'
import { FiSearch, FiX, FiLoader } from 'react-icons/fi'
import useCitySearch from '../../hooks/useCitySearch'

export default function SearchBar({ onSelectCity }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef(null)
  const { results, loading } = useCitySearch(query)

  const showDropdown = isOpen && query.trim().length >= 2

  const handleSelect = (city) => {
    onSelectCity(city)
    setQuery('')
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e) => {
    if (!showDropdown || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault()
      handleSelect(results[highlightedIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative w-full max-w-xl">
      <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
        <FiSearch className="shrink-0 text-slate-400" size={18} />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="city-search-results"
          aria-autocomplete="list"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setHighlightedIndex(-1)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
        {loading && <FiLoader className="shrink-0 animate-spin text-slate-400" size={16} />}
        {!loading && query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="shrink-0 text-slate-400 hover:text-white"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          id="city-search-results"
          role="listbox"
          className="glass absolute z-20 mt-2 w-full overflow-hidden rounded-2xl p-2"
        >
          {results.length === 0 && !loading && (
            <li className="px-4 py-3 text-sm text-slate-400">No cities found.</li>
          )}
          {results.map((city, index) => (
            <li key={city.id} role="option" aria-selected={index === highlightedIndex}>
              <button
                type="button"
                onClick={() => handleSelect(city)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                  index === highlightedIndex ? 'bg-white/10 text-white' : 'text-slate-300'
                }`}
              >
                {city.name}
                {city.admin1 ? `, ${city.admin1}` : ''}
                <span className="text-slate-500"> · {city.country}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
