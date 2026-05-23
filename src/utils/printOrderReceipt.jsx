import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import OrderReceipt from '../components/receipt/OrderReceipt'

const waitForImages = (container) => {
  const images = [...container.querySelectorAll('img')]
  if (!images.length) return Promise.resolve()

  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve()
          else {
            img.onload = resolve
            img.onerror = resolve
          }
        }),
    ),
  )
}

export const canPrintReceipt = (order) =>
  Boolean(order && (order.status === 'Delivered' || order.payment?.paymentStatus === 'Paid'))

export const printOrderReceipt = async (order, payment) => {
  if (!order) return

  const existing = document.getElementById('receipt-print-root')
  existing?.remove()

  const host = document.createElement('div')
  host.id = 'receipt-print-root'
  document.body.appendChild(host)

  const root = createRoot(host)

  flushSync(() => {
    root.render(
      <OrderReceipt
        order={order}
        payment={
          payment || {
            paymentMethod: order.payment?.paymentMethod,
            paidAt: order.payment?.paidAt || order.createdAt || new Date().toISOString(),
          }
        }
      />,
    )
  })

  await waitForImages(host)
  await new Promise((resolve) => setTimeout(resolve, 200))

  const cleanup = () => {
    root.unmount()
    host.remove()
  }

  const onAfterPrint = () => {
    window.removeEventListener('afterprint', onAfterPrint)
    cleanup()
  }

  window.addEventListener('afterprint', onAfterPrint)
  window.print()
  setTimeout(cleanup, 30_000)
}
