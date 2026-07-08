import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'
import Button from './Button'

export default function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="glass mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl p-8 text-center"
    >
      <FiAlertTriangle className="text-rose" size={32} />
      <p className="text-slate-300">{message}</p>
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          <FiRefreshCw size={16} /> Try again
        </Button>
      )}
    </div>
  )
}
