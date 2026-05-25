import { Printer, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import reportService from '../../services/reportService'
import { brandLogoUrl } from '../../utils/cloudinaryAssets'
import { paymentMethodLabels, statusLabels } from '../../utils/constants'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const paymentLabel = (method) => paymentMethodLabels[method] || method || '—'

const Reports = () => {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const loadReports = useCallback(async (silent = false) => {
    try {
      if (silent) setRefreshing(true)
      else setLoading(true)
      setError(null)
      const data = await reportService.getFullReport()
      setReport(data)
    } catch (err) {
      setError(err.message || 'Warbixinta lama soo rari karin')
      setReport(null)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadReports()
  }, [loadReports])

  useEffect(() => {
    const cleanup = () => document.body.classList.remove('printing-report')
    window.addEventListener('afterprint', cleanup)
    return () => window.removeEventListener('afterprint', cleanup)
  }, [])

  const handlePrint = () => {
    document.body.classList.add('printing-report')
    window.print()
  }

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa warbixinaha" />

  if (error) {
    return (
      <div className="reports-page space-y-4">
        <h1 className="section-title text-2xl sm:text-3xl">Warbixinta guud ee makhaayadda</h1>
        <Card className="p-6 text-center">
          <p className="text-brand-cream/70">{error}</p>
          <p className="mt-2 text-sm text-brand-cream/50">
            Hubi in backend uu socdo oo aad dib u bilowdo kadib isbeddelada.
          </p>
          <Button className="mt-4" onClick={() => loadReports()}>
            <RefreshCw size={16} />
            Isku day mar kale
          </Button>
        </Card>
      </div>
    )
  }

  if (!report) return null

  const statusChartData = report.ordersByStatus.map((row) => ({
    name: statusLabels[row.status] || row.status,
    count: row.count,
  }))

  const paymentChartData = report.paymentMethods.map((row) => ({
    name: paymentLabel(row.paymentMethod),
    amount: row.totalAmount,
  }))

  return (
    <div className="reports-page space-y-6">
      <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-gold sm:text-sm sm:tracking-[0.35em]">
            Warbixinno
          </p>
          <h1 className="section-title mt-2 break-words text-2xl sm:text-3xl lg:text-4xl">
            Warbixinta guud ee makhaayadda
          </h1>
          <p className="mt-2 text-sm text-brand-cream/60">
            La diyaariyay: {formatDate(report.generatedAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => loadReports(true)} loading={refreshing}>
            <RefreshCw size={16} />
            Cusbooneysii
          </Button>
          <Button onClick={handlePrint}>
            <Printer size={16} />
            Daabac Warbixin
          </Button>
        </div>
      </div>

      <article id="report-print-document" className="report-print-document space-y-6">
        <header className="report-print-header hidden rounded-2xl border border-slate-200 bg-white p-6 print:block">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <img src={brandLogoUrl} alt="" className="h-14 w-14 rounded-full object-cover" />
              <div>
                <h1 className="text-xl font-bold text-slate-900">NEW JUBAA RESTAURANT</h1>
                <p className="text-xs uppercase tracking-widest text-slate-500">Warbixinta Maamulka</p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-600">
              <p>Taariikh: {formatDate(report.generatedAt)}</p>
              <p>Muqdisho, Soomaaliya</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Iibka Maanta', value: formatCurrency(report.today.totalSales), sub: `${report.today.paidOrders} dalab` },
            { label: 'Iibka Bishan', value: formatCurrency(report.thisMonth.totalSales), sub: `${report.thisMonth.paidOrders} dalab` },
            { label: 'Wadarta Guud', value: formatCurrency(report.allTime.totalSales), sub: `${report.allTime.paidOrders} la bixiyay` },
            {
              label: 'Celceliska Dalabka',
              value: formatCurrency(report.overview.averagePaidOrderValue),
              sub: 'Qiimaha celceliska',
            },
          ].map((kpi) => (
            <Card key={kpi.label} className="report-kpi-card p-5">
              <p className="text-xs uppercase tracking-wider text-brand-cream/55 print:text-slate-500">{kpi.label}</p>
              <p className="mt-2 text-2xl font-bold text-white print:text-slate-900">{kpi.value}</p>
              <p className="mt-1 text-sm text-brand-cream/50 print:text-slate-600">{kpi.sub}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Dhammaan Dalabyada', value: report.overview.totalOrders },
            { label: 'Macaamiisha', value: report.overview.totalCustomers },
            { label: 'Cuntooyinka Menu', value: report.overview.menuItemsCount },
            { label: 'La Heli Karo', value: report.overview.availableMenuItems },
          ].map((item) => (
            <Card key={item.label} className="report-kpi-card p-4 text-center">
              <p className="text-3xl font-bold text-brand-gold print:text-slate-900">{item.value}</p>
              <p className="mt-1 text-xs text-brand-cream/55 print:text-slate-600">{item.label}</p>
            </Card>
          ))}
        </section>

        <div className="no-print grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white">Dalabyada — Xaalad</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusChartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="#FAF8F5" fontSize={11} />
                  <YAxis stroke="#FAF8F5" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#263238',
                      border: '1px solid rgba(251,192,45,0.3)',
                      borderRadius: 12,
                    }}
                  />
                  <Bar dataKey="count" fill="#FBC02D" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white">Habka Lacag-bixinta</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentChartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="#FAF8F5" fontSize={11} />
                  <YAxis stroke="#FAF8F5" />
                  <Tooltip
                    contentStyle={{
                      background: '#263238',
                      border: '1px solid rgba(251,192,45,0.3)',
                      borderRadius: 12,
                    }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Bar dataKey="amount" fill="#B71C1C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl print:text-slate-900">Xaaladaha Dalabka</h2>
            <table className="report-table mt-4 w-full text-left text-sm">
              <thead>
                <tr className="text-brand-cream/50 print:text-slate-500">
                  <th className="pb-2">Xaalad</th>
                  <th className="pb-2 text-right">Tirada</th>
                </tr>
              </thead>
              <tbody>
                {report.ordersByStatus.map((row) => (
                  <tr key={row.status} className="border-t border-white/10 print:border-slate-200">
                    <td className="py-2 text-white print:text-slate-800">
                      {statusLabels[row.status] || row.status}
                    </td>
                    <td className="py-2 text-right font-semibold text-brand-gold print:text-slate-900">
                      {row.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl print:text-slate-900">Habka Lacag-bixinta</h2>
            <table className="report-table mt-4 w-full text-left text-sm">
              <thead>
                <tr className="text-brand-cream/50 print:text-slate-500">
                  <th className="pb-2">Hab</th>
                  <th className="pb-2 text-right">Dalabyo</th>
                  <th className="pb-2 text-right">Wadar</th>
                </tr>
              </thead>
              <tbody>
                {report.paymentMethods.map((row) => (
                  <tr key={row.paymentMethod} className="border-t border-white/10 print:border-slate-200">
                    <td className="py-2 text-white print:text-slate-800">{paymentLabel(row.paymentMethod)}</td>
                    <td className="py-2 text-right print:text-slate-800">{row.orderCount}</td>
                    <td className="py-2 text-right font-semibold text-brand-gold print:text-slate-900">
                      {formatCurrency(row.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl print:text-slate-900">10-ka Cunto ee Ugu Iibka Badan</h2>
          <table className="report-table mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-brand-cream/50 print:text-slate-500">
                <th className="pb-2">#</th>
                <th className="pb-2">Cunto</th>
                <th className="pb-2 text-right">Tirada</th>
                <th className="pb-2 text-right">Dakhliga</th>
              </tr>
            </thead>
            <tbody>
              {report.topSellingItems.map((item, index) => (
                <tr key={item.menuItemId} className="border-t border-white/10 print:border-slate-200">
                  <td className="py-2 text-brand-cream/50 print:text-slate-500">{index + 1}</td>
                  <td className="py-2 text-white print:text-slate-800">{item.foodName}</td>
                  <td className="py-2 text-right print:text-slate-800">{item.quantitySold}</td>
                  <td className="py-2 text-right font-semibold text-brand-gold print:text-slate-900">
                    {formatCurrency(item.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl print:text-slate-900">Iibkii Ugu Dambeeyay (20)</h2>
          <table className="report-table mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-brand-cream/50 print:text-slate-500">
                <th className="pb-2">Dalab</th>
                <th className="pb-2">Macmiil</th>
                <th className="pb-2">Habka</th>
                <th className="pb-2">Taariikh</th>
                <th className="pb-2 text-right">Qiime</th>
              </tr>
            </thead>
            <tbody>
              {report.recentSales.map((sale) => (
                <tr key={`${sale.orderId}-${sale.paidAt}`} className="border-t border-white/10 print:border-slate-200">
                  <td className="py-2 text-white print:text-slate-800">#{sale.orderId}</td>
                  <td className="py-2 print:text-slate-800">{sale.customerName}</td>
                  <td className="py-2 print:text-slate-800">{paymentLabel(sale.paymentMethod)}</td>
                  <td className="py-2 print:text-slate-800">{formatDate(sale.paidAt)}</td>
                  <td className="py-2 text-right font-semibold text-brand-gold print:text-slate-900">
                    {formatCurrency(sale.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <footer className="hidden border-t border-slate-300 pt-4 text-center text-xs text-slate-500 print:block">
          New Jubaa Restaurant — Warbixin sir ah · {formatDate(report.generatedAt)}
        </footer>
      </article>
    </div>
  )
}

export default Reports
