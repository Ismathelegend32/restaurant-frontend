import { Link } from 'react-router-dom'
import Button from './Button'
import StatusBadge from './StatusBadge'

const OrderStaffActions = ({
  role,
  order,
  onStatusUpdate,
  onRecordPayment,
  paying = false,
}) => {
  const { id, status } = order

  if (role === 'Admin') return null

  return (
    <div className="flex flex-col gap-2">
      <StatusBadge status={status} />

      {role === 'Cashier' && status === 'Pending' && (
        <Button size="sm" className="w-full sm:w-auto" onClick={() => onStatusUpdate(id, 'Confirmed')}>
          Xaqiiji dalabka
        </Button>
      )}

      {role === 'Cashier' && status === 'Ready' && (
        <div className="flex flex-wrap gap-2">
          <Link to={`/staff/cashier/payment-confirmation/${id}`}>
            <Button size="sm" variant="primary">
              Qaado lacagta
            </Button>
          </Link>
          {onRecordPayment && (
            <Button size="sm" variant="outline" loading={paying} onClick={() => onRecordPayment(order)}>
              Lacag degdeg
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => onStatusUpdate(id, 'Delivered')}>
            La geeyay
          </Button>
        </div>
      )}

      {role === 'KitchenStaff' && ['Pending', 'Confirmed'].includes(status) && (
        <Button size="sm" variant="outline" onClick={() => onStatusUpdate(id, 'Preparing')}>
          Bilow diyaarinta
        </Button>
      )}

      {role === 'KitchenStaff' && ['Pending', 'Confirmed', 'Preparing'].includes(status) && (
        <Button size="sm" onClick={() => onStatusUpdate(id, 'Ready')}>
          Diyaar
        </Button>
      )}

      {role === 'Cashier' && ['Confirmed', 'Preparing'].includes(status) && (
        <p className="text-xs text-brand-cream/55">Sug jikada inay diyaariso</p>
      )}

      {role === 'KitchenStaff' && status === 'Ready' && (
        <p className="text-xs text-brand-cream/55">Sug qasnajiga</p>
      )}
    </div>
  )
}

export default OrderStaffActions
