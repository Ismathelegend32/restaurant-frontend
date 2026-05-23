import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import StatusBadge from '../../components/ui/StatusBadge'
import orderService from '../../services/orderService'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getMyOrders()
        setOrders(data)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa taariikhda dalabyada" />

  return (
    <div className="container-shell space-y-6 py-10">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Dalabyada</p>
        <h1 className="section-title mt-2">Taariikhda dalabyadaada</h1>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl">Dalab #{order.id}</h3>
                <p className="mt-2 text-sm text-brand-cream/55">
                  {formatDate(order.createdAt)} • {order.neighborhood}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={order.status} />
                <span className="font-semibold text-brand-gold">{formatCurrency(order.totalAmount)}</span>
                <Link to={`/orders/${order.id}`} className="text-sm text-brand-gold">
                  La soco dalabka
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!orders.length && (
        <Card className="p-8 text-center text-brand-cream/65">Weli wax dalab ah ma lihid.</Card>
      )}
    </div>
  )
}

export default OrderHistory
