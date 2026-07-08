import { WiDaySunny } from 'react-icons/wi'

export default function EmptyState() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <WiDaySunny className="animate-float text-sky" size={72} aria-hidden="true" />
      <h2 className="font-heading text-xl font-semibold text-white">
        Search for a city to get started
      </h2>
      <p className="text-sm text-slate-400">
        Try "London", "Tokyo", or "New York" — or use your current location.
      </p>
    </div>
  )
}
