export function describeUvIndex(value) {
  if (value === null || value === undefined) return '--'
  if (value < 3) return 'Low'
  if (value < 6) return 'Moderate'
  if (value < 8) return 'High'
  if (value < 11) return 'Very High'
  return 'Extreme'
}
