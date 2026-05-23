import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import orderService from '../../services/orderService'
import paymentService from '../../services/paymentService'
import { paymentMethodLabels, paymentMethods } from '../../utils/constants'
import { formatCurrency } from '../../utils/formatCurrency'
import { printOrderReceipt } from '../../utils/printOrderReceipt'

const PaymentConfirmation = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await orderService.getById(orderId)
        setOrder(data)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  const handleConfirm = async () => {
    try {
      setSubmitting(true)
      const payment = await paymentService.record({
        orderId: Number(orderId),
        paymentMethod,
        amount: order.totalAmount,
      })
      const confirmed = await paymentService.confirm(payment.id)
      const refreshed = await orderService.getById(orderId)
      toast.success('Lacag-bixinta waa la xaqiijiyay — dalabka waa la geyay')
      await printOrderReceipt(refreshed, {
        ...confirmed,
        paymentMethod: confirmed.paymentMethod || paymentMethod,
      })
      navigate('/staff/cashier')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa bogga lacag-bixinta" />
  if (!order) return null

  return (
    <div className="container-shell flex justify-center py-10">
      <Card className="w-full max-w-3xl p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Xaqiijinta Lacag-bixinta</p>
        <h1 className="mt-3 text-4xl">Dalab #{order.id}</h1>
        <div className="mt-6 space-y-3 text-sm text-brand-cream/85">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
              <span>
                {item.foodName} x {item.quantity}
              </span>
              <span>{formatCurrency(item.subtotal)}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label className="field-label">Habka Lacag-bixinta</label>
            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
              {paymentMethods.map((method) => (
                <option key={method} value={method} className="bg-brand-surface text-white">
                  {paymentMethodLabels[method] || method}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm text-brand-cream/65">Wadarta Lacagta</p>
            <p className="mt-2 text-3xl font-semibold text-brand-gold">{formatCurrency(order.totalAmount)}</p>
          </div>
        </div>

        <Button className="mt-8 w-full" onClick={handleConfirm} loading={submitting}>
          Xaqiiji Lacag-bixinta
        </Button>
      </Card>
    </div>
  )
}

export default PaymentConfirmation
