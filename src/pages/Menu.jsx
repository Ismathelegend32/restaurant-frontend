import { Search, ShoppingCart } from 'lucide-react'
import IconInput from '../components/ui/IconInput'
import { useEffect, useMemo, useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useCart } from '../hooks/useCart'
import menuService from '../services/menuService'
import {
  fallbackMenuItems,
  inferMenuCategory,
  menuCategories,
  menuCategoryLabels,
  STORAGE_KEYS,
} from '../utils/constants'
import { formatCurrency } from '../utils/formatCurrency'

const Menu = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const { addItem } = useCart()

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.menuFilters)
    if (raw) {
      const parsed = JSON.parse(raw)
      setSearch(parsed.search || '')
      setActiveCategory(parsed.activeCategory || 'All')
    }
  }, [])

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await menuService.getAll()
        setItems(data?.length ? data : fallbackMenuItems)
      } catch {
        setItems(fallbackMenuItems)
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.menuFilters,
      JSON.stringify({
        search,
        activeCategory,
      }),
    )
  }, [search, activeCategory])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const category = inferMenuCategory(item)
      const matchesCategory = activeCategory === 'All' || category === activeCategory
      const matchesSearch = `${item.foodName} ${item.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, items, search])

  if (loading) return <LoadingSpinner label="Waxaa la diyaarinayaa menu-ga" />

  return (
    <div className="container-shell space-y-8 py-10">
      <Card className="overflow-hidden border-brand-gold/25">
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(10,10,10,0.9), rgba(10,10,10,0.45), rgba(10,10,10,0.88)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80')",
            }}
          />
          <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Menu-ga Premium-ka</p>
              <h1 className="section-title max-w-3xl">Cuntooyin la xushay oo leh dhadhan Bariga Afrika ah</h1>
              <p className="section-copy max-w-2xl">
                Ka dooro cuntooyin badan, kala shaandhee qayb ahaan, oo ku raaxayso menu muuqaal
                qurux badan leh oo ka kooban cuntooyin waaweyn, cabitaanno, iyo macmacaanno.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-brand-gold/20 bg-brand-surface/55 p-4">
                <p className="text-2xl font-semibold text-white">{items.length}</p>
                <p className="mt-2 text-sm text-brand-cream/65">Cuntooyin La Heli Karo</p>
              </div>
              <div className="rounded-[1.5rem] border border-brand-gold/20 bg-brand-surface/55 p-4">
                <p className="text-2xl font-semibold text-white">4</p>
                <p className="mt-2 text-sm text-brand-cream/65">Qaybo La Xushay</p>
              </div>
              <div className="rounded-[1.5rem] border border-brand-gold/20 bg-brand-surface/55 p-4">
                <p className="text-2xl font-semibold text-white">Chef</p>
                <p className="mt-2 text-sm text-brand-cream/65">Doorashooyinka Chef-ka</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? 'bg-brand-gold text-brand-black'
                    : 'bg-white/5 text-brand-cream/75 hover:text-brand-gold'
                }`}
              >
                {menuCategoryLabels[category] || category}
              </button>
            ))}
          </div>

          <IconInput
            className="w-full lg:max-w-md"
            icon={Search}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Raadi cunto..."
          />
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        {items.slice(0, 6).map((item) => (
          <span
            key={item.id}
            className="rounded-full border border-brand-gold/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-brand-cream/70"
          >
            {item.foodName}
          </span>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group flex flex-col">
            <div className="relative h-60 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.foodName}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute left-4 top-4 rounded-full bg-brand-black/80 px-3 py-1 text-xs font-semibold text-brand-gold">
                {menuCategoryLabels[inferMenuCategory(item)] || inferMenuCategory(item)}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-black to-transparent" />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl">{item.foodName}</h3>
                <span className="font-semibold text-brand-gold">{formatCurrency(item.price)}</span>
              </div>
              <p className="flex-1 text-sm leading-7 text-brand-cream/70">{item.description}</p>
              <Button onClick={() => addItem(item)} className="w-full">
                <ShoppingCart size={16} />
                Ku Dar Gaariga
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {!filteredItems.length && (
        <Card className="p-10 text-center">
          <h3 className="text-2xl">Wax item ah lama helin</h3>
          <p className="mt-3 text-sm text-brand-cream/70">
            Isku day qayb kale ama wax ka beddel raadintaada.
          </p>
        </Card>
      )}
    </div>
  )
}

export default Menu
