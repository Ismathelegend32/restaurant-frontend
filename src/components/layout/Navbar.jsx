import { Menu, ShoppingBag, User, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { roleDashboardPaths, roleLabels } from '../../utils/constants'
import Button from '../ui/Button'
import logo from '../../assets/new-jubba-logo.png'

const Navbar = ({ staffMode = false }) => {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const isStaff = ['Admin', 'Cashier', 'KitchenStaff'].includes(user?.role)

  const links = useMemo(() => {
    if (staffMode && isAuthenticated && isStaff) {
      return [
        { to: roleDashboardPaths[user.role] || '/staff', label: 'Shaqadayda' },
        { to: '/', label: 'Bogga Macmiilka' },
      ]
    }

    return [
      { to: '/', label: 'Bogga Hore' },
      { to: '/menu', label: 'Menu-ga' },
      { to: '/contact', label: 'Xiriir' },
      ...(isAuthenticated && user?.role === 'Customer'
        ? [
            { to: '/dashboard', label: 'Koontada' },
            { to: '/orders/history', label: 'Dalabyadayda' },
          ]
        : []),
      ...(isAuthenticated && isStaff
        ? [{ to: roleDashboardPaths[user.role] || '/staff', label: roleLabels[user.role] || 'Shaqada' }]
        : []),
    ]
  }, [isAuthenticated, isStaff, staffMode, user?.role])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-navy/90 shadow-card backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-4 py-3 sm:py-4">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="New Jubba Restaurant"
            className="h-12 w-12 rounded-full border-2 border-brand-gold/40 bg-white object-contain p-0.5 shadow-glow transition group-hover:scale-105 sm:h-14 sm:w-14"
          />
          <div className="hidden min-w-0 sm:block">
            <p className="font-heading text-lg font-bold leading-tight text-white">
              NEW <span className="text-brand-red">JUBAA</span>
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-gold">
              Restaurant
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? 'text-brand-gold' : 'text-brand-cream/80 hover:text-brand-gold'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!staffMode && (
            <Link
              to="/cart"
              className="relative rounded-full border border-white/15 bg-white/5 p-3 text-brand-cream transition hover:border-brand-gold hover:text-brand-gold"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(roleDashboardPaths[user?.role] || '/')}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-brand-cream transition hover:border-brand-gold"
              >
                <User size={16} className="text-brand-gold" />
                <span>
                  {user?.name?.split(' ')[0]}
                  {user?.role ? ` • ${roleLabels[user.role] || user.role}` : ''}
                </span>
              </button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Ka Bax
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Gal
              </Button>
              <Button variant="accent" size="sm" onClick={() => navigate('/register')}>
                Bilow Hadda
              </Button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="rounded-full border border-white/15 bg-white/5 p-3 text-brand-cream lg:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand-navy lg:hidden">
          <div className="container-shell flex flex-col gap-3 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 font-medium ${
                    isActive ? 'nav-pill-active' : 'bg-white/5 text-brand-cream/85'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {!staffMode && (
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white/5 px-4 py-3 font-medium text-brand-cream/85"
              >
                Gaari ({itemCount})
              </Link>
            )}
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout}>
                Ka Bax
              </Button>
            ) : (
              <div className="grid gap-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Gal
                </Button>
                <Button variant="accent" onClick={() => navigate('/register')}>
                  Bilow Hadda
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
