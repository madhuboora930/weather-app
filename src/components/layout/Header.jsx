import { WiDaySunny } from 'react-icons/wi'
import UnitToggle from '../weather/UnitToggle'

export default function Header() {
  return (
    <header className="glass-nav mx-auto mt-4 flex max-w-4xl items-center justify-between rounded-full px-5 py-3 sm:px-6">
      <div className="flex items-center gap-2 font-heading text-lg font-semibold text-white">
        <WiDaySunny className="text-amber" size={26} />
        Skycast
      </div>
      <UnitToggle />
    </header>
  )
}
