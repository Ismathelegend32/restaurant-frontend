import { Package, ShoppingBag, Truck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import StatusBadge from '../../components/ui/StatusBadge'
import { useAuth } from '../../hooks/useAuth'
import orderService from '../../services/orderService'
import { roleLabels } from '../../utils/constants'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const CustomerDashboard = () => {
  const { user } = useAuth()
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

  const stats = useMemo(() => {
    const activeOrders = orders.filter((order) => !['Delivered', 'Cancelled'].includes(order.status))
    const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0)
    return [
      { label: 'Wadarta Dalabyada', value: orders.length, icon: ShoppingBag },
      { label: 'Dalabyada Socda', value: activeOrders.length, icon: Truck },
      { label: 'Wadarta Lacagta', value: formatCurrency(totalSpent), icon: Package },
    ]
  }, [orders])

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa koontadaada" />

  return (
    <div className="container-shell space-y-8 py-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Koontada Macmiilka</p>
        <h1 className="section-title">Ku soo dhawoow, {user?.name}</h1>
        <p className="section-copy">
          La soco dhaqdhaqaaqaaga, eeg heerka dalabyadaada, oo maamul koontadaada hal meel.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.label} className="p-6">
            <item.icon className="text-brand-gold" size={22} />
            <p className="mt-4 text-sm text-brand-cream/65">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Dalabyadii Ugu Dambeeyay</h2>
            <Link to="/orders/history" className="text-sm text-brand-gold">
              Arag dhammaan
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex flex-col gap-3 rounded-2xl border border-brand-gold/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">Dalab #{order.id}</p>
                  <p className="mt-1 text-sm text-brand-cream/55">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <span className="text-sm font-semibold text-brand-gold">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl">Koobanida Xogtaada</h2>
          <div className="mt-5 space-y-3 text-sm text-brand-cream/65">
            <p>
              <span className="text-brand-gold">Magac:</span> {user?.name}
            </p>
            <p>
              <span className="text-brand-gold">Email:</span> {user?.email}
            </p>
            <p>
              <span className="text-brand-gold">Doorka:</span> {roleLabels[user?.role] || user?.role}
            </p>
          </div>
          <Link to="/profile" className="mt-6 inline-block">
            <span className="text-sm font-semibold text-brand-gold">Wax Ka Beddel Profile-ka</span>
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default CustomerDashboard
