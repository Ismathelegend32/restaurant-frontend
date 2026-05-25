import {
  ArrowRight,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  UtensilsCrossed,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LazyMapEmbed from '../components/ui/LazyMapEmbed'
import menuService from '../services/menuService'
import {
  brandLogoUrlSmall,
  homeGalleryImages,
  homeHeroDefault,
  homeHeroSideImage,
  homeHeroSrcSet,
  optimizeImageUrl,
} from '../utils/cloudinaryAssets'
import { diningHighlights, locationDetails } from '../utils/constants'
import { FALLBACK_MENU_COUNT, featuredFallbackMenu } from '../utils/fallbackMenu'
import { formatCurrency } from '../utils/formatCurrency'

const ContactForm = lazy(() => import('../components/contact/ContactForm'))

const Home = () => {
  const [featured, setFeatured] = useState(featuredFallbackMenu)

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const items = await menuService.getAll()
        if (items?.length) {
          setFeatured(items.slice(0, 6))
        }
      } catch {
        setFeatured(featuredFallbackMenu)
      }
    }

    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadFeatured(), { timeout: 2000 })
      } else {
        setTimeout(loadFeatured, 300)
      }
    }

    scheduleLoad()
  }, [])

  return (
    <div className="space-y-12 pb-16 sm:space-y-20 sm:pb-24">
      <section className="relative overflow-hidden bg-[#0f1416]">
        <img
          src={homeHeroDefault}
          srcSet={homeHeroSrcSet}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-premium-overlay absolute inset-0" />
        <div className="hero-premium-grain pointer-events-none absolute inset-0" />

        <div className="container-shell relative grid min-h-[72vh] items-center gap-12 py-16 sm:min-h-[80vh] sm:py-20 lg:min-h-[88vh] lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="max-w-2xl space-y-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.45em] text-brand-gold/90">
              New Jubaa Restaurant · Muqdisho
            </p>

            <div className="space-y-6">
              <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-[4.25rem]">
                Dhadhami dhaqanka,
                <span className="mt-2 block text-brand-gold">martigelin heer sare.</span>
              </h1>
              <p className="max-w-xl text-base leading-8 text-brand-cream/72 sm:text-lg sm:leading-8">
                Cunto Soomaaliyeed iyo Bariga Afrika ah oo si xirfad leh loo diyaariyay — menu
                nadiif ah, dalab fudud, iyo khibrad makhaayadeed oo premium ah.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/menu">
                <Button size="lg">
                  Baadh Menu-ga
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Nala soo xiriir
                </Button>
              </Link>
            </div>

            <div className="grid max-w-xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {[
                { label: 'Cuntooyin', value: `${FALLBACK_MENU_COUNT}+` },
                { label: 'Diyaarinta', value: '~18 daq' },
                { label: 'Qiimeyn', value: '4.9' },
              ].map((item) => (
                <div key={item.label} className="bg-[#0f1416]/90 px-5 py-4">
                  <p className="font-heading text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-cream/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
              <img
                src={homeHeroSideImage}
                alt="Cunto premium ah oo si qurux badan loo diyaariyay"
                className="h-[min(520px,68vh)] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1416] via-[#0f1416]/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#0f1416]/90 p-5">
                <div className="flex items-center gap-4">
                  <img
                    src={brandLogoUrlSmall}
                    alt="New Jubba"
                    className="h-12 w-12 rounded-full border border-white/15 object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Star size={14} className="shrink-0 text-brand-gold" fill="currentColor" />
                      <p className="truncate font-heading text-lg text-white">Chef&apos;s Selection</p>
                    </div>
                    <p className="mt-1 text-sm text-brand-cream/60">
                      Tayada, dhadhanka, iyo soo dhaweyn diirran.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="perf-section container-shell">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: Clock3, title: 'Fulinta Degdegga ah', copy: 'Jikada iyo qasnajiga oo loo habeeyay xawaare sare.' },
            { icon: ShieldCheck, title: 'Dalab Amaan ah', copy: 'Galitaan la ilaaliyo, roles kala soocan, iyo sessions ammaan ah.' },
            { icon: UtensilsCrossed, title: 'Muuqaal Qurux Badan', copy: 'Cards premium ah, visuals nadiif ah, iyo dareen makhaayadeed oo heer sare ah.' },
          ].map((item) => (
            <Card key={item.title} className="p-6">
              <item.icon className="mb-4 text-brand-gold" size={22} />
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-cream/70">{item.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="perf-section container-shell">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Menu-ga La Xushay</p>
            <h2 className="section-title mt-2">Cuntooyinka uu chef-ku doortay ee qeexaya miiskeenna</h2>
          </div>
          <Link to="/menu" className="text-sm font-medium text-brand-gold">
            Arag menu-ga oo dhan
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((item) => (
            <Card key={item.id} className="group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={optimizeImageUrl(item.imageUrl, { width: 480 })}
                  alt={item.foodName}
                  loading="lazy"
                  className="hover-zoom-image h-full w-full object-cover"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-brand-black/75 px-3 py-1 text-xs font-semibold text-brand-gold">
                  {item.category}
                </div>
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl">{item.foodName}</h3>
                  <span className="text-sm font-semibold text-brand-gold">
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <p className="text-sm leading-7 text-brand-cream/70">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="perf-section container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Jawiga Gaarka ah</p>
              <h2 className="section-title mt-2">Website makhaayadeed oo nool dareen ahaan</h2>
            </div>
            <div className="hidden rounded-full border border-brand-gold/20 bg-brand-gold/10 px-4 py-2 text-sm text-brand-gold sm:block">
              UI Premium ah
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {homeGalleryImages.map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden rounded-[1.75rem] ${index === 1 ? 'sm:translate-y-8' : ''}`}
              >
                <img
                  src={image}
                  alt="Jawiga makhaayadda"
                  loading="lazy"
                  className="h-72 w-full object-cover"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          {diningHighlights.map((item) => (
            <Card key={item.title} className="p-8">
              <p className="text-sm font-semibold tracking-[0.35em] text-brand-gold">Heer Sare</p>
              <h3 className="mt-5 text-3xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-cream/70">{item.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="perf-section container-shell grid gap-6 lg:grid-cols-3">
        {[
          {
            step: '01',
            title: 'Baadh',
            copy: 'Daawo sawirro tayo leh, qaybaha menu-ga, iyo cuntooyin si qurux badan loo soo bandhigay.',
          },
          {
            step: '02',
            title: 'Dalbo',
            copy: 'Ku dar gaariga, dooro degmadaada Muqdisho, oo ku dir dalabka dhowr tallaabo oo nadiif ah.',
          },
          {
            step: '03',
            title: 'Ku Raaxayso',
            copy: 'La soco marxalad kasta laga bilaabo xaqiijinta ilaa gaarsiinta adigoo arkaya xaalad cad.',
          },
        ].map((item) => (
          <Card key={item.step} className="p-8">
            <p className="text-sm font-semibold tracking-[0.35em] text-brand-gold">{item.step}</p>
            <h3 className="mt-6 text-3xl">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-brand-cream/70">{item.copy}</p>
          </Card>
        ))}
      </section>

      <section className="perf-section container-shell">
        <Card className="overflow-hidden p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Nagu Saabsan</p>
              <h2 className="section-title mt-4">Waxaan ku dhisannahay martigelin, waxaana kor u qaaday nidaam casri ah</h2>
            </div>
            <div className="space-y-4 text-sm leading-8 text-brand-cream/75">
              <p>
                New Jubba Restaurant waxay xusaysaa hidaha cunnada Soomaaliyeed iyo Bariga Afrika
                iyadoo leh jawi nadiif ah, dhadhan xooggan, iyo adeeg qalbi leh.
              </p>
              <p>
                Nidaamkan maamulka ahi wuxuu mideynayaa macaamiisha, jikada, qasnajiga, iyo maamulka
                si ay ugu wada shaqeeyaan hal khibrad dijitaal ah oo qurux badan.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section id="contact" className="perf-section container-shell">
        <Card className="overflow-hidden p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Xiriir</p>
              <h2 className="section-title mt-3">Noo soo dir fariin</h2>
              <p className="mt-4 text-sm leading-7 text-brand-cream/75">
                Geli magacaaga, telefoonkaaga, mawduuca iyo fariintaada.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-block text-sm font-semibold text-brand-gold hover:text-white"
              >
                Bogga xiriirka oo buuxa →
              </Link>
            </div>
            <Suspense fallback={<p className="text-sm text-brand-cream/60">Foomka waa la soo rarayaa...</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </Card>
      </section>

      <section id="location-map" className="perf-section container-shell">
        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Goobta & Khibradda</p>
              <h2 className="section-title mt-3">Nagu soo booqo Dayniile</h2>
              <p className="mt-4 text-sm leading-8 text-brand-cream/75">
                Makhaayaddeennu waxay ku habboon tahay qoysaska, kulammada ganacsiga, iyo habeenno
                aan la ilaawi karin oo leh dhadhan Soomaaliyeed oo qani ah.
              </p>

              <div className="mt-8 space-y-4 text-sm text-brand-cream/75">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 text-brand-gold" size={18} />
                  <div>
                    <p className="font-semibold text-white">{locationDetails.label}</p>
                    <p>{locationDetails.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-1 text-brand-gold" size={18} />
                  <div>
                    <p className="font-semibold text-white">Waan Furnahay Maalin Walba</p>
                    <p>11:00 subaxnimo - 11:30 habeenimo</p>
                  </div>
                </div>
              </div>
            </div>

            <LazyMapEmbed
              title="Goobta New Jubba Restaurant"
              src={locationDetails.mapEmbedUrl}
              className="min-h-[360px] overflow-hidden"
              minHeight={360}
            />
          </div>
        </Card>
      </section>
    </div>
  )
}

export default Home
