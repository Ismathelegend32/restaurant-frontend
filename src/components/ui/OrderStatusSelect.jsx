import {
  getAllowedNextStatuses,
  getStatusOptionsForRole,
  statusLabels,
} from '../../utils/constants'
import StatusBadge from './StatusBadge'

const OrderStatusSelect = ({ role, currentStatus, value, onChange, className = '' }) => {
  const allowedNext = getAllowedNextStatuses(role, currentStatus)

  if (role !== 'Admin' && allowedNext.length === 0) {
    return <StatusBadge status={currentStatus} />
  }

  const options =
    role === 'Admin'
      ? getStatusOptionsForRole('Admin')
      : allowedNext.map((statusValue) => ({
          value: statusValue,
          label: statusLabels[statusValue] || statusValue,
        }))

  return (
    <select value={value} onChange={onChange} className={className}>
      {options.map((status) => (
        <option key={status.value} value={status.value} className="bg-brand-surface text-white">
          {status.label}
        </option>
      ))}
    </select>
  )
}

export default OrderStatusSelect
