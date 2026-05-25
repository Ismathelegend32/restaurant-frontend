import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null

  const sizeClass =
    size === 'lg' ? 'max-w-3xl' : size === 'sm' ? 'max-w-md' : 'max-w-2xl'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/70 p-0 sm:items-center sm:bg-brand-navy/50 sm:p-4 sm:backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`glass-panel sm:animate-fadeIn flex max-h-[92dvh] w-full min-w-0 flex-col border-brand-gold/30 sm:max-h-[85vh] sm:rounded-3xl ${sizeClass}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-brand-gold/10 px-4 py-4 sm:px-6">
          <h3 className="min-w-0 text-xl font-semibold sm:text-2xl">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-brand-gold/20 p-2.5 text-brand-cream/65 transition hover:border-brand-gold hover:text-brand-gold"
            aria-label="Xir"
          >
            <X size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal
