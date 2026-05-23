import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import orderService from '../services/orderService'
import { neighborhoods, STORAGE_KEYS } from '../utils/constants'
import { formatCurrency } from '../utils/formatCurrency'

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [neighborhood, setNeighborhood] = useState(neighborhoods[0])
  const [contactPhone, setContactPhone] = useState(user?.phoneNumber || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.checkoutDraft)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed?.neighborhood) {
        setNeighborhood(parsed.neighborhood)
      }
      if (parsed?.contactPhone) {
        setContactPhone(parsed.contactPhone)
      }
    }
  }, [])

  useEffect(() => {
    if (!contactPhone && user?.phoneNumber) {
      setContactPhone(user.phoneNumber)
    }
  }, [contactPhone, user?.phoneNumber])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.checkoutDraft,
      JSON.stringify({
        neighborhood,
        contactPhone,
      }),
    )
  }, [neighborhood, contactPhone])

  const payload = useMemo(
    () => ({
      neighborhood,
      contactPhone,
      items: items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
      })),
    }),
    [contactPhone, items, neighborhood],
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!items.length) {
      toast.error('Gaarigaagu waa madhan yahay')
      navigate('/menu')
      return
    }

    try {
      setLoading(true)
      const order = await orderService.placeOrder(payload)
      clearCart()
      localStorage.removeItem(STORAGE_KEYS.checkoutDraft)
      toast.success('Dalabka si guul leh ayaa loo diray')
      navigate(`/orders/${order.id}`)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_0.85fr]">
      <Card className="p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Lacag-bixin</p>
        <h1 className="mt-3 text-4xl">Dhameystir dalabkaaga</h1>
        <p className="mt-3 text-sm leading-7 text-brand-cream/65">
          Ku soo dhawoow {user?.name}. Xaqiiji degmadaada oo dib u eeg cuntooyinka aad dooratay.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="field-label">Lambarka Xiriirka</label>
            <input
              value={contactPhone}
              onChange={(event) => setContactPhone(event.target.value)}
              placeholder="+252 61 234 5678"
            />
            <p className="mt-2 text-xs text-brand-cream/45">
              Lambarkan ayaan kugu soo wici doonaa ama kuguugu soo diri doonaa fariin dalabka.
            </p>
          </div>

          <div>
            <label className="field-label">Degmada</label>
            <select value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)}>
              {neighborhoods.map((item) => (
                <option key={item} value={item} className="bg-brand-surface text-white">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full" loading={loading}>
            Dir Dalabka
          </Button>
        </form>
      </Card>

      <Card className="h-fit p-6">
        <h2 className="text-2xl">Soo Koobidda Dalabka</h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 border-b border-brand-gold/10 pb-4">
              <div>
                <p className="font-medium text-white">{item.foodName}</p>
                <p className="text-sm text-brand-cream/55">Tiro {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-brand-gold">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between text-lg">
          <span>Wadarta Guud</span>
          <span className="font-semibold text-brand-gold">{formatCurrency(subtotal)}</span>
        </div>
      </Card>
    </div>
  )
}

export default Checkout
