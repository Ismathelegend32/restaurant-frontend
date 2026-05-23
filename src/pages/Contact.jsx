import { Mail, MapPin } from 'lucide-react'
import Card from '../components/ui/Card'
import ContactForm from '../components/contact/ContactForm'
import WhatsAppContactCard from '../components/contact/WhatsAppContactCard'
import { restaurantContact } from '../utils/constants'

const Contact = () => {
  return (
    <div className="container-shell space-y-10 py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Xiriir</p>
        <h1 className="section-title mt-3 text-3xl sm:text-4xl">Nala soo xiriir</h1>
        <p className="mt-4 text-sm leading-7 text-brand-cream/70 sm:text-base">
          Magac iyo telefoon kaliya — fariinta waxay toos ugu tagaysaa email-kaaga (Static Forms).
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <WhatsAppContactCard />

          <Card className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Email</p>
            <a
              href={`mailto:${restaurantContact.email}`}
              className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-white transition hover:text-brand-gold"
            >
              <Mail size={20} className="text-brand-gold" />
              {restaurantContact.email}
            </a>
          </Card>

          <Card className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Goobta</p>
            <div className="mt-3 flex items-start gap-3 text-sm leading-7 text-brand-cream/70">
              <MapPin size={18} className="mt-1 shrink-0 text-brand-gold" />
              <span>{restaurantContact.address}</span>
            </div>
          </Card>
        </div>

        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Foomka Fariinta</h2>
          <p className="mt-2 text-sm text-brand-cream/60">
            Geli magacaaga, telefoonkaaga, mawduuca iyo fariintaada.
          </p>
          <ContactForm className="mt-8" />
        </Card>
      </div>
    </div>
  )
}

export default Contact
