import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/35 p-4 backdrop-blur-sm">
      <div className="glass-panel animate-fadeIn w-full max-w-2xl border-brand-gold/30">
        <div className="flex items-center justify-between border-b border-brand-gold/10 px-6 py-4">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full border border-brand-gold/20 p-2 text-brand-cream/65 transition hover:border-brand-gold hover:text-brand-gold"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal
