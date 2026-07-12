import { WiDaySunny } from 'react-icons/wi'
import { FiArrowLeft } from 'react-icons/fi'
import UnitToggle from '../weather/UnitToggle'

export default function Header() {
  return (
    <header className="glass-nav mx-auto mt-4 flex max-w-4xl items-center justify-between rounded-full px-5 py-3 sm:px-6">
      <div className="flex items-center gap-4">
        <a
          href="https://madhuboora.online"
          title="Back to Portfolio"
          className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <FiArrowLeft size={16} />
          <span className="hidden sm:inline">Portfolio</span>
        </a>
        <span className="h-5 w-px bg-white/10" aria-hidden="true" />
        <div className="flex items-center gap-2 font-heading text-lg font-semibold text-white">
          <WiDaySunny className="text-amber" size={26} />
          Skycast
        </div>
      </div>
      <UnitToggle />
    </header>
  )
}
