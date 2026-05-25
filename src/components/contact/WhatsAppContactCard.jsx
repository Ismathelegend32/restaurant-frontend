import { MessageCircle } from 'lucide-react'
import { restaurantContact, whatsappUrl } from '../../utils/constants'

const WhatsAppIcon = ({ className = 'h-6 w-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const WhatsAppContactCard = ({ compact = false, className = '' }) => {
  const { display } = restaurantContact.whatsapp

  if (compact) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-[#7dffb0] transition hover:bg-[#25D366]/20 hover:text-white ${className}`}
      >
        <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
        <span>{display}</span>
      </a>
    )
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-3xl border border-[#25D366]/30 bg-gradient-to-br from-[#128C7E]/25 via-brand-navy/60 to-[#075E54]/30 p-5 shadow-card transition hover:border-[#25D366]/55 hover:shadow-[0_0_32px_rgba(37,211,102,0.18)] sm:p-6 ${className}`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 rounded-full bg-[#25D366]/15 sm:block sm:blur-2xl" aria-hidden />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)]">
            <WhatsAppIcon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7dffb0]">
              Taageerada Maamulka
            </p>
            <h3 className="mt-1 font-heading text-lg font-bold text-white sm:text-xl">Nala soo xiriir WhatsApp</h3>
            <p className="mt-1 text-sm text-brand-cream/65">
              Caawimo degdeg ah, dalabyo, iyo arrimaha maamulka makhaayadda.
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center sm:text-right">
          <p className="text-xs text-brand-cream/50">Lambarka Admin</p>
          <p className="mt-1 text-lg font-semibold tracking-wide text-white">{display}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#25D366] group-hover:text-[#7dffb0]">
            <MessageCircle size={16} />
            Fariin dir
          </span>
        </div>
      </div>
    </a>
  )
}

export default WhatsAppContactCard
