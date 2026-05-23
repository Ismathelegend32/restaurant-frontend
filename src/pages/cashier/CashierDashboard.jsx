import { CreditCard, Printer } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import StatusBadge from '../../components/ui/StatusBadge'
import orderService from '../../services/orderService'
import { paymentMethodLabels, statusLabels } from '../../utils/constants'
import { filterOrdersForRole } from '../../utils/orderRoleAccess'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { fetchAndPrintReceipt } from '../../utils/fetchAndPrintReceipt'

const CASHIER_SECTIONS = [
  { key: 'Pending', title: 'Sugaya xaqiijin', action: 'confirm' },
  { key: 'Confirmed', title: 'La xaqiijiyay — sug jikada', action: null },
  { key: 'Preparing', title: 'La diyaarinayo', action: null },
  { key: 'Ready', title: 'Diyaar — lacag-bixin', action: 'pay' },
]

const CashierDashboard = () => {
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
  }, [])

  const cashierOrders = useMemo(() => filterOrdersForRole(orders, 'Cashier'), [orders])

  const handleConfirm = async (orderId) => {
    try {
      await orderService.updateStatus(orderId, 'Confirmed')
      toast.success('Dalabka waa la xaqiijiyay')
      await loadOrders()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleReprint = async (orderId) => {
    await fetchAndPrintReceipt(orderId, { onError: (message) => toast.error(message) })
  }

  const deliveredOrders = useMemo(
    () =>
      cashierOrders
        .filter((o) => o.status === 'Delivered')
        .sort((a, b) => new Date(b.payment?.paidAt || b.createdAt) - new Date(a.payment?.paidAt || a.createdAt)),
    [cashierOrders],
  )

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa safka qasnajiga" />

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Qaybta Qasnajiga</p>
        <h1 className="section-title mt-2 text-2xl sm:text-3xl">Lacag-bixinta dalabyada</h1>
        <p className="mt-2 text-sm text-brand-cream/65">
          Xaaladaha: {CASHIER_SECTIONS.map((s) => statusLabels[s.key]).join(' → ')}
        </p>
      </div>

      {loadError && (
        <Card className="border-brand-error/40 p-6 text-center text-brand-error">{loadError}</Card>
      )}

      {CASHIER_SECTIONS.map(({ key, title, action }) => {
        const sectionOrders = cashierOrders.filter((o) => o.status === key)
        if (!sectionOrders.length) return null

        return (
          <section key={key} className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              {title}{' '}
              <span className="text-sm font-normal text-brand-gold">({sectionOrders.length})</span>
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {sectionOrders.map((order) => (
                <Card key={order.id} className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Dalab #{order.id}</h3>
                      <p className="mt-1 text-sm text-brand-cream/55">
                        {order.customer.name} • {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="mt-3 text-lg font-semibold text-brand-gold">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {action === 'confirm' && (
                      <Button size="sm" onClick={() => handleConfirm(order.id)}>
                        Xaqiiji dalabka
                      </Button>
                    )}
                    {action === 'pay' && (
                      <>
                        <Link to={`/staff/cashier/payment-confirmation/${order.id}`}>
                          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-black">
                            <CreditCard size={16} />
                            Qaado lacagta
                          </span>
                        </Link>
                      </>
                    )}
                    <Link
                      to="/staff/orders"
                      className="text-sm text-brand-gold hover:underline"
                    >
                      Liiska oo dhan
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )
      })}

      {deliveredOrders.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            La geyay — daabac rasiid{' '}
            <span className="text-sm font-normal text-brand-gold">({deliveredOrders.length})</span>
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {deliveredOrders.map((order) => (
              <Card key={order.id} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Dalab #{order.id}</h3>
                    <p className="mt-1 text-sm text-brand-cream/55">
                      {order.customer.name} • {formatDate(order.payment?.paidAt || order.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <p className="mt-3 text-lg font-semibold text-brand-gold">
                  {formatCurrency(order.totalAmount)}
                </p>
                {order.payment?.paymentMethod && (
                  <p className="mt-1 text-sm text-brand-cream/55">
                    {paymentMethodLabels[order.payment.paymentMethod] || order.payment.paymentMethod}
                  </p>
                )}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => handleReprint(order.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 px-4 py-2 text-sm text-brand-gold"
                  >
                    <Printer size={16} />
                    Daabac rasiid
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {!loadError && !cashierOrders.length && (
        <Card className="p-8 text-center text-brand-cream/65">
          Ma jiro dalabyo. Macmiilku ha sameeyo dalab cusub, kadib halkan ayaad ku arki doontaa.
        </Card>
      )}
    </div>
  )
}

export default CashierDashboard
