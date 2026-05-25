import { useEffect, useState } from 'react'
import { ExternalLink, Printer, X } from 'lucide-react'
import Button from '../ui/Button'
import OrderReceipt from './OrderReceipt'
import { registerReceiptPreview } from '../../utils/receiptPreview'
import { openReceiptPrintWindow } from '../../utils/printOrderReceipt'

const ReceiptPreviewHost = () => {
  const [payload, setPayload] = useState(null)

  useEffect(() => registerReceiptPreview(setPayload), [])

  if (!payload) return null

  const { order, payment } = payload

  const close = () => setPayload(null)

  const handleOpenPrintPage = () => {
    openReceiptPrintWindow(order, payment)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/70 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:items-center sm:justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-preview-title"
    >
      <div className="mx-auto flex w-full max-w-md min-h-0 flex-1 flex-col sm:max-h-[92dvh] sm:flex-none">
        <div className="mb-3 flex shrink-0 items-center justify-between gap-3 sm:mb-4">
          <h2 id="receipt-preview-title" className="text-lg font-semibold text-white">
            Rasiidka dalabka #{order.id}
          </h2>
          <button
            type="button"
            onClick={close}
            className="rounded-full border border-white/20 bg-white/10 p-2.5 text-white"
            aria-label="Xir"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-3 shrink-0 text-center text-xs leading-relaxed text-brand-cream/75 sm:text-sm">
          Mobile-ka: taabo <strong className="text-brand-gold">Daabac / PDF</strong> si bog cusub uu u
          furo, kadib dooro &quot;Save as PDF&quot; ama Print.
        </p>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-2xl">
          <OrderReceipt order={order} payment={payment} />
        </div>

        <div className="mt-3 grid shrink-0 grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2">
          <Button type="button" variant="outline" className="w-full" onClick={close}>
            Xir
          </Button>
          <Button type="button" className="w-full" onClick={handleOpenPrintPage}>
            <Printer size={16} className="mr-2 inline" />
            Daabac / PDF
          </Button>
        </div>

        <button
          type="button"
          onClick={handleOpenPrintPage}
          className="mt-2 flex shrink-0 items-center justify-center gap-2 text-sm text-brand-gold hover:text-amber-200"
        >
          <ExternalLink size={14} />
          Fur bogga rasiidka cusub
        </button>
      </div>
    </div>
  )
}

export default ReceiptPreviewHost
