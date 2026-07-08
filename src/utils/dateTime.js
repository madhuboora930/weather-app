// Open-Meteo returns local time strings already adjusted for the location's
// timezone (when timezone=auto is passed), so we can parse them directly
// without any timezone math here.

export function formatHour(isoString) {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
}

export function formatDayLabel(isoDateString, index) {
  if (index === 0) return 'Today'
  const date = new Date(isoDateString)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export function formatClockTime(isoString) {
  if (!isoString) return '--:--'
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function isCurrentHour(isoString, referenceIsoString) {
  return new Date(isoString).getHours() === new Date(referenceIsoString).getHours()
}
