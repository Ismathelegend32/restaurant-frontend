import { Download, Share, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { brandLogoUrlSmall } from '../../utils/cloudinaryAssets'

const DISMISS_KEY = 'new-jubba-pwa-install-dismissed'

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showIosHint, setShowIosHint] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (isStandalone()) return

    if (sessionStorage.getItem(DISMISS_KEY) === '1') {
      setHidden(true)
      return
    }

    if (isIOS()) {
      setShowIosHint(true)
    }

    const onBeforeInstall = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setShowIosHint(false)
    }

    const onInstalled = () => {
      setDeferredPrompt(null)
      setShowIosHint(false)
      setHidden(true)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1')
    setHidden(true)
    setDeferredPrompt(null)
    setShowIosHint(false)
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setHidden(true)
    }
    setDeferredPrompt(null)
  }

  if (hidden || isStandalone()) return null
  if (!deferredPrompt && !showIosHint) return null

  return (
    <div
      className="sticky top-0 z-[60] border-b border-brand-gold/25 bg-brand-navy/98 px-3 py-3 shadow-card backdrop-blur-sm sm:px-4"
      role="region"
      aria-label="Ku rakib app-ka"
    >
      <div className="container-shell flex items-start gap-3">
        <img
          src={brandLogoUrlSmall}
          alt=""
          className="mt-0.5 h-10 w-10 shrink-0 rounded-xl border border-brand-gold/30 object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Ku rakib New Jubba</p>
          {deferredPrompt ? (
            <p className="mt-0.5 text-xs leading-5 text-brand-cream/75">
              Riix Install si app ugu furto telefoonka — browser-ka kor ma muuqdo.
            </p>
          ) : (
            <p className="mt-0.5 text-xs leading-5 text-brand-cream/75">
              Safari: riix <Share size={12} className="inline align-text-bottom" /> Share, kadib{' '}
              <strong className="text-brand-gold">Add to Home Screen</strong>.
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {deferredPrompt && (
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold px-3 py-2 text-xs font-bold text-brand-black transition hover:bg-amber-300"
            >
              <Download size={14} />
              Install
            </button>
          )}
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-white/15 p-2 text-brand-cream/70 transition hover:border-brand-gold hover:text-brand-gold"
            aria-label="Xir"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt
