import { statusConfig, statusLabels } from '../../utils/constants'

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        statusConfig[status] || 'border-brand-gold/20 bg-brand-surface/70 text-brand-cream/85'
      }`}
    >
      {statusLabels[status] || status}
    </span>
  )
}

export default StatusBadge
