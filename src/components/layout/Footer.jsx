import { Mail, MapPin } from 'lucide-react'
import WhatsAppContactCard from '../contact/WhatsAppContactCard'
import { restaurantContact } from '../../utils/constants'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-brand-navy/80">
      <div className="container-shell grid gap-8 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-2xl text-white">
            NEW <span className="text-brand-red">JUBAA</span> Restaurant
          </h3>
          <p className="mt-3 text-sm leading-7 text-brand-cream/70">
            Dhadhami Dhaqanka, Dareen Kala Duwanaanta. Cunto tayo sare leh iyo nidaam
            casri ah oo loo habeeyay martigelinta Soomaaliyeed.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Xiriir</p>
          <div className="mt-4 space-y-3 text-sm text-brand-cream/70">
            <WhatsAppContactCard compact className="!border-brand-gold/25 !bg-white/5" />
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-brand-gold" />
              <span>{restaurantContact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-brand-gold" />
              <span>{restaurantContact.address}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Saacadaha Furitaanka</p>
          <div className="mt-4 space-y-2 text-sm text-brand-cream/70">
            <p>Isniin - Khamiis: 11:00 subaxnimo - 11:00 habeenimo</p>
            <p>Jimce - Sabti: 11:00 subaxnimo - 01:00 habeennimo</p>
            <p>Axad: 12:00 duhurnimo - 10:00 habeenimo</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
