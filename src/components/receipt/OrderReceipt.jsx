import logo from '../../assets/new-jubba-logo.png'
import { paymentMethodLabels } from '../../utils/constants'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const OrderReceipt = ({ order, payment }) => {
  const paidAt = payment?.paidAt || new Date().toISOString()
  const methodLabel = paymentMethodLabels[payment?.paymentMethod] || payment?.paymentMethod || '—'

  return (
    <article className="receipt-paper mx-auto w-full max-w-[320px] bg-white p-5 text-[11px] leading-snug text-slate-900">
      <header className="border-b border-dashed border-slate-300 pb-4 text-center">
        <img src={logo} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" />
        <h1 className="mt-2 font-heading text-base font-bold tracking-tight text-slate-900">
          NEW <span className="text-[#B71C1C]">JUBAA</span> RESTAURANT
        </h1>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">Rasiidka Lacag-bixinta</p>
      </header>

      <section className="mt-3 space-y-1 border-b border-dashed border-slate-300 pb-3 text-[10px]">
        <div className="flex justify-between gap-2">
          <span className="text-slate-500">Dalab #</span>
          <span className="font-semibold">{order.id}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-slate-500">Taariikh</span>
          <span>{formatDate(paidAt)}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-slate-500">Macmiil</span>
          <span className="text-right">{order.customer?.name || '—'}</span>
        </div>
        {order.contactPhone && (
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">Telefoon</span>
            <span>{order.contactPhone}</span>
          </div>
        )}
        {order.neighborhood && (
          <div className="flex justify-between gap-2">
            <span className="text-slate-500">Degmo</span>
            <span>{order.neighborhood}</span>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <span className="text-slate-500">Habka lacagta</span>
          <span className="font-semibold">{methodLabel}</span>
        </div>
      </section>

      <table className="mt-3 w-full border-collapse text-[10px]">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="pb-1 font-medium">Cunto</th>
            <th className="pb-1 text-center font-medium">Tir</th>
            <th className="pb-1 text-right font-medium">Qiime</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item) => (
            <tr key={item.id} className="border-b border-slate-100">
              <td className="py-1.5 pr-1">{item.foodName}</td>
              <td className="py-1.5 text-center">{item.quantity}</td>
              <td className="py-1.5 text-right">{formatCurrency(item.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="mt-3 border-t-2 border-slate-900 pt-2">
        <div className="flex items-center justify-between text-sm font-bold">
          <span>WADARTA</span>
          <span>{formatCurrency(order.totalAmount)}</span>
        </div>
        <p className="mt-4 text-center text-[10px] text-slate-500">
          Mahadsanid — New Jubba Restaurant
          <br />
          Dayniile, Muqdisho
        </p>
      </footer>
    </article>
  )
}

export default OrderReceipt
