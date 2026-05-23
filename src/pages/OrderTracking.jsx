import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import StatusBadge from '../components/ui/StatusBadge'
import orderService from '../services/orderService'
import { statusLabels } from '../utils/constants'
import { formatCurrency } from '../utils/formatCurrency'
import { formatDate } from '../utils/formatDate'

const timeline = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered']

const OrderTracking = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let intervalId

    const loadOrder = async () => {
      try {
        const data = await orderService.getById(id)
        setOrder(data)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
    intervalId = setInterval(loadOrder, 15000)

    return () => clearInterval(intervalId)
  }, [id])

  const currentStep = useMemo(() => {
    if (!order?.status) return -1
    return timeline.indexOf(order.status)
  }, [order?.status])

  if (loading) return <LoadingSpinner label="Waxaa la raadinayaa dalabkaaga" />
  if (!order) return null

  return (
    <div className="container-shell space-y-8 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Raad-raaca Dalabka</p>
          <h1 className="section-title mt-2">Dalab #{order.id}</h1>
          <p className="mt-3 text-sm text-brand-cream/65">
            Waxaa la dhigay {formatDate(order.createdAt)} kuna socda {order.neighborhood}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <Card className="p-6">
        <div className="grid gap-5 md:grid-cols-5">
          {timeline.map((status, index) => {
            const active = currentStep >= index
            return (
              <div key={status} className="relative rounded-3xl border border-brand-gold/10 bg-white/5 p-4">
                <div
                  className={`mb-4 h-10 w-10 rounded-full border ${
                    active
                      ? 'border-brand-gold bg-brand-gold text-brand-black'
                      : 'border-brand-gold/20 text-brand-cream/45'
                  } flex items-center justify-center text-sm font-bold`}
                >
                  {index + 1}
                </div>
                <p className={`font-medium ${active ? 'text-white' : 'text-brand-cream/45'}`}>
                  {statusLabels[status] || status}
                </p>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl">Faahfaahinta Dalabka</h2>
        <div className="mt-6 space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 border-b border-brand-gold/10 pb-4">
              <div>
                <p className="font-medium text-white">{item.foodName}</p>
                <p className="text-sm text-brand-cream/55">
                  Tirada {item.quantity} x {formatCurrency(item.unitPrice)}
                </p>
              </div>
              <span className="font-semibold text-brand-gold">{formatCurrency(item.subtotal)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-lg">Wadarta Guud</span>
          <span className="text-lg font-semibold text-brand-gold">{formatCurrency(order.totalAmount)}</span>
        </div>
      </Card>
    </div>
  )
}

export default OrderTracking
