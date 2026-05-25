import { buildReceiptPrintHtml } from './buildReceiptPrintHtml'
import { isMobileDevice, openReceiptPreview } from './receiptPreview'

export const canPrintReceipt = (order) =>
  Boolean(order && (order.status === 'Delivered' || order.payment?.paymentStatus === 'Paid'))

const resolvePayment = (order, payment) =>
  payment || {
    paymentMethod: order.payment?.paymentMethod,
    paidAt: order.payment?.paidAt || order.createdAt || new Date().toISOString(),
  }

/** Opens a clean receipt page — works on mobile print / Save as PDF (no blank page). */
export const openReceiptPrintWindow = (order, payment) => {
  if (!order) return false

  const html = buildReceiptPrintHtml(order, resolvePayment(order, payment))
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const blobUrl = URL.createObjectURL(blob)

  const printWin = window.open(blobUrl, '_blank', 'noopener,noreferrer')

  if (!printWin) {
    const link = document.createElement('a')
    link.href = blobUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  setTimeout(() => URL.revokeObjectURL(blobUrl), 120_000)
  return true
}

export const runReceiptPrint = async (order, payment) => {
  openReceiptPrintWindow(order, payment)
}

export const printOrderReceipt = async (order, payment) => {
  if (!order) return

  if (isMobileDevice()) {
    openReceiptPreview(order, resolvePayment(order, payment))
    return
  }

  openReceiptPrintWindow(order, payment)
}
