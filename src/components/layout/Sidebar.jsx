import { LogOut } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { roleDashboardPaths, roleLabels, staffSectionTitles } from '../../utils/constants'
import { getStaffNav } from '../../utils/staffNav'
import { brandLogoUrlSmall } from '../../utils/cloudinaryAssets'
import Button from '../ui/Button'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links = getStaffNav(user?.role)
  const sectionTitle = staffSectionTitles[user?.role] || 'Qaybta Shaqaalaha'
  const homePath = roleDashboardPaths[user?.role] || '/staff'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!links.length) return null

  return (
    <>
      <aside className="hidden h-full w-[260px] shrink-0 flex-col border-r border-white/10 bg-[#141a1c] xl:flex">
        <div className="border-b border-white/10 p-5">
          <Link to={homePath} className="flex items-center gap-3">
            <img
              src={brandLogoUrlSmall}
              alt="New Jubaa"
              className="h-11 w-11 rounded-full border border-brand-gold/30 object-cover"
            />
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-bold text-white">New Jubaa</p>
              <p className="truncate text-[10px] uppercase tracking-[0.2em] text-brand-gold/80">
                {sectionTitle}
              </p>
            </div>
          </Link>
          <p className="mt-3 truncate px-1 text-xs text-brand-cream/50">
            {user?.name} · {roleLabels[user?.role] || user?.role}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-gold text-brand-black'
                      : 'text-brand-cream/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={18} className="shrink-0" />
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-3">
          <Link
            to="/"
            className="block rounded-xl px-4 py-2.5 text-center text-xs text-brand-cream/55 transition hover:bg-white/5 hover:text-brand-gold"
          >
            Bogga Macmiilka
          </Link>
          <Button variant="ghost" className="w-full justify-center text-sm" onClick={handleLogout}>
            <LogOut size={16} />
            Ka Bax
          </Button>
        </div>
      </aside>

      <div className="shrink-0 border-b border-white/10 bg-[#141a1c] xl:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link to={homePath} className="flex min-w-0 items-center gap-2">
            <img src={brandLogoUrlSmall} alt="" className="h-9 w-9 rounded-full border border-brand-gold/30 object-cover" />
            <span className="truncate text-sm font-semibold text-white">New Jubaa</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-lg p-2 text-brand-cream/60 hover:bg-white/5 hover:text-white"
            aria-label="Ka bax"
          >
            <LogOut size={18} />
          </button>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-3 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-brand-gold text-brand-black' : 'bg-white/5 text-brand-cream/75'
                  }`
                }
              >
                <Icon size={16} />
                {link.shortLabel}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
