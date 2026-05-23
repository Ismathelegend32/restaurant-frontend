export const formatDate = (value, options = {}) => {
  if (!value) return 'Ma jiro'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Taariikh aan sax ahayn'

  return new Intl.DateTimeFormat('so-SO', {
    dateStyle: 'medium',
    timeStyle: 'short',
    ...options,
  }).format(date)
}
