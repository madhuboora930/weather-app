import { UnitProvider } from './context/UnitContext'
import AnimatedBackground from './components/layout/AnimatedBackground'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <UnitProvider>
      <AnimatedBackground />
      <HomePage />
    </UnitProvider>
  )
}
