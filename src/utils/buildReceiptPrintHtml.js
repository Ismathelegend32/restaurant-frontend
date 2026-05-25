import { brandLogoUrl } from './cloudinaryAssets'
import { paymentMethodLabels } from './constants'
import { formatCurrency } from './formatCurrency'
import { formatDate } from './formatDate'

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const receiptStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 100%;
    background: #ffffff;
    color: #0f172a;
    font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body { padding: 16px; }
  .toolbar {
    max-width: 360px;
    margin: 0 auto 12px;
    display: flex;
    gap: 8px;
  }
  .toolbar button {
    flex: 1;
    border: none;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-print { background: #fbc02d; color: #1a1a1a; }
  .btn-close { background: #e2e8f0; color: #0f172a; }
  .receipt {
    max-width: 360px;
    margin: 0 auto;
    background: #fff;
    color: #0f172a;
    padding: 20px;
    font-size: 11px;
    line-height: 1.45;
  }
  .receipt header {
    border-bottom: 1px dashed #cbd5e1;
    padding-bottom: 16px;
    text-align: center;
  }
  .receipt img {
    width: 64px;
    height: 64px;
    border-radius: 999px;
    object-fit: cover;
    margin: 0 auto 8px;
    display: block;
  }
  .receipt h1 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .receipt h1 span { color: #b71c1c; }
  .receipt .subtitle {
    margin-top: 4px;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #64748b;
  }
  .meta {
    margin-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px dashed #cbd5e1;
    font-size: 10px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 4px;
  }
  .row .label { color: #64748b; }
  .row .value { font-weight: 600; text-align: right; }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
    font-size: 10px;
  }
  th {
    text-align: left;
    color: #64748b;
    font-weight: 500;
    padding-bottom: 4px;
    border-bottom: 1px solid #e2e8f0;
  }
  th:nth-child(2), td:nth-child(2) { text-align: center; }
  th:nth-child(3), td:nth-child(3) { text-align: right; }
  td {
    padding: 6px 0;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: top;
  }
  .total {
    margin-top: 12px;
    padding-top: 8px;
    border-top: 2px solid #0f172a;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 700;
  }
  .thanks {
    margin-top: 16px;
    text-align: center;
    font-size: 10px;
    color: #64748b;
  }
  @page { margin: 6mm; size: 80mm auto; }
  @media print {
    body { padding: 0; }
    .toolbar { display: none !important; }
    .receipt { max-width: 72mm; padding: 0; }
  }
`

export const buildReceiptPrintHtml = (order, payment) => {
  const paidAt = payment?.paidAt || order.createdAt || new Date().toISOString()
  const methodLabel =
    paymentMethodLabels[payment?.paymentMethod] || payment?.paymentMethod || '—'

  const itemRows = (order.items || [])
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.foodName)}</td>
          <td>${escapeHtml(item.quantity)}</td>
          <td>${escapeHtml(formatCurrency(item.subtotal))}</td>
        </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="so">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Rasiid #${escapeHtml(order.id)} — New Jubba</title>
  <style>${receiptStyles}</style>
</head>
<body>
  <div class="toolbar">
    <button type="button" class="btn-print" onclick="window.print()">Daabac / Kaydi PDF</button>
    <button type="button" class="btn-close" onclick="window.close()">Xir</button>
  </div>
  <article class="receipt">
    <header>
      <img src="${escapeHtml(brandLogoUrl)}" alt="New Jubba" />
      <h1>NEW <span>JUBAA</span> RESTAURANT</h1>
      <p class="subtitle">Rasiidka Lacag-bixinta</p>
    </header>
    <section class="meta">
      <div class="row"><span class="label">Dalab #</span><span class="value">${escapeHtml(order.id)}</span></div>
      <div class="row"><span class="label">Taariikh</span><span class="value">${escapeHtml(formatDate(paidAt))}</span></div>
      <div class="row"><span class="label">Macmiil</span><span class="value">${escapeHtml(order.customer?.name || '—')}</span></div>
      ${order.contactPhone ? `<div class="row"><span class="label">Telefoon</span><span class="value">${escapeHtml(order.contactPhone)}</span></div>` : ''}
      ${order.neighborhood ? `<div class="row"><span class="label">Degmo</span><span class="value">${escapeHtml(order.neighborhood)}</span></div>` : ''}
      <div class="row"><span class="label">Habka lacagta</span><span class="value">${escapeHtml(methodLabel)}</span></div>
    </section>
    <table>
      <thead>
        <tr><th>Cunto</th><th>Tir</th><th>Qiime</th></tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>
    <div class="total">
      <span>WADARTA</span>
      <span>${escapeHtml(formatCurrency(order.totalAmount))}</span>
    </div>
    <p class="thanks">Mahadsanid — New Jubba Restaurant<br />Dayniile, Muqdisho</p>
  </article>
</body>
</html>`
}
