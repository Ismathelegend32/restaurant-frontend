import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { optimizeImageUrl } from '../utils/cloudinaryAssets'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatCurrency'

const Cart = () => {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!items.length) {
    return (
      <div className="container-shell py-10 sm:py-16">
        <Card className="p-8 text-center sm:p-10">
          <ShoppingBag className="mx-auto text-brand-gold" size={48} />
          <h1 className="mt-6 text-3xl">Gaarigaagu waa madhan yahay</h1>
          <p className="mt-3 text-sm text-brand-cream/65">
            Ka dooro cuntooyinka gaarka ah ee makhaayadda si aad u bilowdo dalabkaaga.
          </p>
          <Link to="/menu" className="mt-6 inline-block">
            <Button>Baadh Menu-ga</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Gaari</p>
          <h1 className="section-title mt-2">Hubi dalabkaaga ka hor lacag-bixinta</h1>
        </div>

        {items.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                src={optimizeImageUrl(item.imageUrl, { width: 224, height: 224 })}
                alt={item.foodName}
                className="h-24 w-full rounded-2xl object-cover sm:w-28"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl">{item.foodName}</h3>
                    <p className="mt-1 text-sm text-brand-cream/55">{item.description}</p>
                  </div>
                  <p className="font-semibold text-brand-gold">{formatCurrency(item.price)}</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 rounded-full border border-brand-gold/20 bg-white/5 px-3 py-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span className="min-w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-brand-cream/65">
                      Wadarta item-kan:{' '}
                      <span className="font-semibold text-white">{formatCurrency(item.quantity * item.price)}</span>
                    </p>
                    <button onClick={() => removeItem(item.id)} className="text-brand-error">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="h-fit p-6">
        <h2 className="text-2xl">Soo Koobidda Dalabka</h2>
        <div className="mt-6 space-y-4 text-sm text-brand-cream/65">
          <div className="flex items-center justify-between">
            <span>Tirada Cuntooyinka</span>
            <span>{items.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Gaarsiin</span>
            <span>Waa ku jiraa</span>
          </div>
          <div className="flex items-center justify-between border-t border-brand-gold/10 pt-4 text-base text-white">
            <span>Wadarta Guud</span>
            <span className="font-semibold text-brand-gold">{formatCurrency(subtotal)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button className="w-full" onClick={() => navigate(isAuthenticated ? '/checkout' : '/login')}>
            U Gudub Bixinta
          </Button>
          <Button variant="outline" className="w-full" onClick={clearCart}>
            Madhi Gaariga
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Cart
