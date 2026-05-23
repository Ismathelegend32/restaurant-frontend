import { useAuth } from '../../hooks/useAuth'
import WhatsAppContactCard from '../contact/WhatsAppContactCard'
import { roleLabels } from '../../utils/constants'

const footerByRole = {
  Admin: {
    title: 'Maamulka Guud',
    lines: ['Maamul menu-ga, dalabyada, isticmaaleyaasha iyo warbixinnada.'],
    showWhatsApp: true,
  },
  Cashier: {
    title: 'Qaybta Qasnajiga',
    lines: ['Xaqiiji dalabyada, qaado lacagta, daabac rasiidka.'],
    showWhatsApp: false,
  },
  KitchenStaff: {
    title: 'Qaybta Jikada',
    lines: ['Diyaari cuntada marka dalabka la xaqiijiyo — Diyaar u beddel.'],
    showWhatsApp: false,
  },
}

const StaffFooter = () => {
  const { user } = useAuth()
  const copy = footerByRole[user?.role]

  if (!copy) return null

  return (
    <footer className="mt-4 shrink-0 border-t border-white/10 pt-4">
      <div className="rounded-2xl border border-brand-gold/15 bg-brand-navy/50 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
              New Jubaa Restaurant
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{copy.title}</p>
            <p className="mt-0.5 text-xs text-brand-cream/55">{copy.lines[0]}</p>
          </div>
          <div className="shrink-0 text-left text-xs text-brand-cream/45 sm:text-right">
            <p>
              {user?.name} · {roleLabels[user?.role] || user?.role}
            </p>
            <p className="mt-1">© {new Date().getFullYear()}</p>
            {copy.showWhatsApp && (
              <div className="mt-2 sm:flex sm:justify-end">
                <WhatsAppContactCard compact />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default StaffFooter
