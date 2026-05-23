import { Clock3 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import StatusBadge from '../../components/ui/StatusBadge'
import orderService from '../../services/orderService'
import { statusLabels } from '../../utils/constants'
import { filterOrdersForRole } from '../../utils/orderRoleAccess'
import { formatDate } from '../../utils/formatDate'

const KITCHEN_STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready']

const KitchenDisplay = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  const loadOrders = async () => {
    try {
      setLoadError(null)
      const data = await orderService.getAll()
      setOrders(data)
    } catch (error) {
      setLoadError(error.message)
      setOrders([])
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
    const intervalId = setInterval(loadOrders, 15000)
    return () => clearInterval(intervalId)
  }, [])

  const kitchenOrders = useMemo(
    () => filterOrdersForRole(orders, 'KitchenStaff'),
    [orders],
  )

  const activeOrders = useMemo(
    () => kitchenOrders.filter((order) => KITCHEN_STATUSES.includes(order.status)),
    [kitchenOrders],
  )

  const counts = useMemo(
    () =>
      KITCHEN_STATUSES.reduce((acc, status) => {
        acc[status] = kitchenOrders.filter((o) => o.status === status).length
        return acc
      }, {}),
    [kitchenOrders],
  )

  const handleUpdate = async (id, nextStatus) => {
    try {
      await orderService.updateStatus(id, nextStatus)
      toast.success(
        nextStatus === 'Preparing'
          ? 'Dalabka waxaa loo beddelay diyaarin'
          : 'Dalabka waa diyaar',
      )
      await loadOrders()
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa dalabyada jikada" />

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Qaybta Jikada</p>
        <h1 className="section-title mt-2 text-2xl sm:text-3xl">Diyaarinta cuntada</h1>
        <p className="mt-2 text-sm text-brand-cream/65">
          Xaaladaha: Sugaya → La xaqiijiyay → La diyaarinayo → Diyaar
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {KITCHEN_STATUSES.map((status) => (
          <span
            key={status}
            className="rounded-full border border-brand-gold/25 bg-white/5 px-3 py-1 text-xs text-brand-cream/80"
          >
            {statusLabels[status]}: <strong className="text-brand-gold">{counts[status] || 0}</strong>
          </span>
        ))}
      </div>

      {loadError && (
        <Card className="border-brand-error/40 p-6 text-center text-brand-error">{loadError}</Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activeOrders.map((order) => (
          <Card key={order.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">Dalab #{order.id}</h2>
              <StatusBadge status={order.status} />
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-brand-cream/55">
              <Clock3 size={16} className="shrink-0 text-brand-gold" />
              <span>{formatDate(order.createdAt)}</span>
            </div>

            <ul className="mt-5 space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-white">{item.foodName}</span>
                  <span className="text-brand-cream/55">×{item.quantity}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {order.status !== 'Preparing' && order.status !== 'Ready' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleUpdate(order.id, 'Preparing')}
                >
                  Bilow diyaarinta
                </Button>
              )}
              {order.status !== 'Ready' && (
                <Button size="sm" className="flex-1" onClick={() => handleUpdate(order.id, 'Ready')}>
                  Diyaar
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {!loadError && !activeOrders.length && (
        <Card className="p-8 text-center text-brand-cream/65">
          Ma jiro dalab firfircoon. Hubi in qasnajigu uu xaqiijiyay dalabyada cusub.
        </Card>
      )}
    </div>
  )
}

export default KitchenDisplay
