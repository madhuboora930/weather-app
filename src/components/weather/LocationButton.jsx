import { useState } from 'react'
import { FiMapPin, FiLoader } from 'react-icons/fi'
import useGeolocation from '../../hooks/useGeolocation'
import { reverseGeocode } from '../../services/geocodingApi'
import IconButton from '../ui/IconButton'

export default function LocationButton({ onLocationDetected }) {
  const { loading, requestLocation } = useGeolocation()
  const [error, setError] = useState(null)

  const handleClick = async () => {
    setError(null)
    try {
      const { latitude, longitude } = await requestLocation()
      const location = await reverseGeocode(latitude, longitude)
      onLocationDetected(location)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="relative">
      <IconButton label="Use my current location" onClick={handleClick} disabled={loading}>
        {loading ? <FiLoader className="animate-spin" size={18} /> : <FiMapPin size={18} />}
      </IconButton>
      {error && (
        <p role="alert" className="absolute top-full right-0 mt-2 w-48 text-right text-xs text-rose">
          {error}
        </p>
      )}
    </div>
  )
}
