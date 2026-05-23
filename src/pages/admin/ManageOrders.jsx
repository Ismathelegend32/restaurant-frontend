import { Printer } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Modal from '../../components/ui/Modal'
import StatusBadge from '../../components/ui/StatusBadge'
import orderService from '../../services/orderService'
import paymentService from '../../services/paymentService'
import { useAuth } from '../../hooks/useAuth'
import OrderStaffActions from '../../components/ui/OrderStaffActions'
import OrderStatusSelect from '../../components/ui/OrderStatusSelect'
import { getFilterOptionsForRole, paymentMethods } from '../../utils/constants'
import { filterOrdersForRole, statusLegendForRole } from '../../utils/orderRoleAccess'
import { canPrintReceipt } from '../../utils/printOrderReceipt'
import { fetchAndPrintReceipt } from '../../utils/fetchAndPrintReceipt'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const pageCopy = {
  Admin: {
    tag: 'Dalabyada Maamulka',
    title: 'Maamul dhammaan dalabyada makhaayadda',
  },
  Cashier: {
    tag: 'Qasnajiga',
    title: 'Dalabyada lacag-bixinta & xaqiijinta',
  },
  KitchenStaff: {
    tag: 'Jikada',
    title: 'Dalabyada jikada',
  },
}

const ManageOrders = () => {
  const { user } = useAuth()
  const role = user?.role || 'Admin'
  const copy = pageCopy[role] || pageCopy.Admin
  const filterOptions = getFilterOptionsForRole(role)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeStatus, setActiveStatus] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [payingOrderId, setPayingOrderId] = useState(null)
  const [printingOrderId, setPrintingOrderId] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const statusLegend = statusLegendForRole(role)

  const loadOrders = async () => {
    try {
      setLoading(true)
      setLoadError(null)
      const data = await orderService.getAll()
      setOrders(data)
    } catch (error) {
      setLoadError(error.message)
      setOrders([])
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const roleOrders = useMemo(() => filterOrdersForRole(orders, role), [orders, role])

  const filteredOrders = useMemo(() => {
    if (activeStatus === 'All') return roleOrders
    return roleOrders.filter((order) => order.status === activeStatus)
  }, [activeStatus, roleOrders])

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await orderService.updateStatus(orderId, status)
      toast.success('Xaaladda dalabka waa la cusboonaysiiyay')
      await loadOrders()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const canRecordPayment = (order) =>
    order.status === 'Ready' && order.payment?.paymentStatus !== 'Paid'

  const handleRecordPayment = async (order) => {
    try {
      setPayingOrderId(order.id)
      const payment = await paymentService.record({
        orderId: order.id,
        paymentMethod: paymentMethods[0],
        amount: order.totalAmount,
      })
      await paymentService.confirm(payment.id)
      toast.success('Lacag-bixinta waa la xaqiijiyay')
      await loadOrders()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setPayingOrderId(null)
    }
  }

  const handlePrintReceipt = async (orderId) => {
    setPrintingOrderId(orderId)
    await fetchAndPrintReceipt(orderId, { onError: (message) => toast.error(message) })
    setPrintingOrderId(null)
  }

  const showPrintAction = (order) =>
    (role === 'Admin' || role === 'Cashier') && canPrintReceipt(order)

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa dhammaan dalabyada" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-gold sm:text-sm sm:tracking-[0.35em]">
            {copy.tag}
          </p>
          <h1 className="section-title mt-2 break-words text-2xl sm:text-3xl lg:text-4xl">{copy.title}</h1>
          {role !== 'Admin' && (
            <p className="mt-2 text-sm text-brand-cream/65">
              Waxaad aragtaa kaliya xaaladaha shaqadaada:{' '}
              {statusLegend.map((s) => s.label).join(' • ')}
            </p>
          )}
        </div>
        <select
          value={activeStatus}
          onChange={(event) => setActiveStatus(event.target.value)}
          className="w-full sm:max-w-[220px]"
        >
          {filterOptions.map((status) => (
            <option key={status.value} value={status.value} className="bg-brand-surface text-white">
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {loadError && (
        <Card className="border-brand-error/40 p-6 text-center text-brand-error">{loadError}</Card>
      )}

      {!loadError && !filteredOrders.length && (
        <Card className="p-8 text-center text-brand-cream/70">
          {roleOrders.length
            ? 'Wax dalab ah lama helin xaaladdan. Dooro "Dhammaan".'
            : 'Weli ma jiro dalabyo ku habboon qaybtaada. Samee dalab macmiil ahaan si aad u tijaabiso.'}
        </Card>
      )}

      {!!filteredOrders.length && (
        <>
          <div className="grid gap-4 lg:hidden">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">Dalab #{order.id}</p>
                    <p className="mt-1 text-sm text-brand-cream/65">{order.customer.name}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="mt-4 grid gap-3 text-sm text-brand-cream/75 sm:grid-cols-2">
                  <div>
                    <p className="text-brand-cream/50">Cuntooyin</p>
                    <p className="mt-1 font-medium text-white">{order.items.length} cunto</p>
                  </div>
                  <div>
                    <p className="text-brand-cream/50">Wadarta</p>
                    <p className="mt-1 font-medium text-brand-gold">{formatCurrency(order.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-brand-cream/50">Taariikh</p>
                    <p className="mt-1 font-medium text-white">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-brand-cream/50">Goobta</p>
                    <p className="mt-1 font-medium text-white">{order.neighborhood}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-brand-gold/10 bg-white/5 p-4 text-sm text-brand-cream/75">
                  <p className="text-brand-cream/50">Lambarka Xiriirka</p>
                  <p className="mt-1 break-words font-medium text-white">{order.contactPhone || 'Ma jiro'}</p>
                </div>

                <div className="mt-4 grid gap-3">
                  {canRecordPayment(order) && (
                    <Button
                      className="w-full"
                      loading={payingOrderId === order.id}
                      onClick={() => handleRecordPayment(order)}
                    >
                      Xaqiiji Lacagta
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full" onClick={() => setSelectedOrder(order)}>
                    Faahfaahin
                  </Button>
                  {showPrintAction(order) && (
                    <Button
                      variant="outline"
                      className="w-full"
                      loading={printingOrderId === order.id}
                      onClick={() => handlePrintReceipt(order.id)}
                    >
                      <Printer size={16} className="mr-2 inline" />
                      Daabac rasiid
                    </Button>
                  )}
                  {role === 'Admin' ? (
                    <OrderStatusSelect
                      role={role}
                      currentStatus={order.status}
                      value={order.status}
                      onChange={(event) => handleStatusUpdate(order.id, event.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <OrderStaffActions
                      role={role}
                      order={order}
                      onStatusUpdate={handleStatusUpdate}
                      onRecordPayment={role === 'Cashier' ? handleRecordPayment : undefined}
                      paying={payingOrderId === order.id}
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Card className="hidden overflow-x-auto p-6 lg:block">
            <table className="min-w-full text-left text-sm">
              <thead className="text-brand-cream/55">
                <tr>
                  <th className="pb-4">ID</th>
                  <th className="pb-4">Macmiil</th>
                  <th className="pb-4">Cuntooyin</th>
                  <th className="pb-4">Wadar</th>
                  <th className="pb-4">Xaalad</th>
                  <th className="pb-4">Taariikh</th>
                  <th className="pb-4">Ficillo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/10">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 font-medium text-white">#{order.id}</td>
                    <td className="py-4 text-brand-cream/75">{order.customer.name}</td>
                    <td className="py-4 text-brand-cream/75">{order.items.length} cunto</td>
                    <td className="py-4 text-brand-gold">{formatCurrency(order.totalAmount)}</td>
                    <td className="py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 text-brand-cream/75">{formatDate(order.createdAt)}</td>
                    <td className="py-4">
                      <div className="flex flex-wrap items-center gap-3">
                        {canRecordPayment(order) && (
                          <button
                            type="button"
                            onClick={() => handleRecordPayment(order)}
                            disabled={payingOrderId === order.id}
                            className="text-brand-gold hover:underline disabled:opacity-50"
                          >
                            {payingOrderId === order.id ? 'Waa la xaqiijinayaa...' : 'Xaqiiji Lacagta'}
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-brand-gold hover:underline"
                        >
                          Faahfaahin
                        </button>
                        {showPrintAction(order) && (
                          <button
                            type="button"
                            onClick={() => handlePrintReceipt(order.id)}
                            disabled={printingOrderId === order.id}
                            className="inline-flex items-center gap-1 text-brand-gold hover:underline disabled:opacity-50"
                          >
                            <Printer size={14} />
                            {printingOrderId === order.id ? 'Waa la daabacayaa...' : 'Daabac rasiid'}
                          </button>
                        )}
                        {role === 'Admin' ? (
                          <OrderStatusSelect
                            role={role}
                            currentStatus={order.status}
                            value={order.status}
                            onChange={(event) => handleStatusUpdate(order.id, event.target.value)}
                            className="max-w-[180px]"
                          />
                        ) : (
                          <OrderStaffActions
                            role={role}
                            order={order}
                            onStatusUpdate={handleStatusUpdate}
                            onRecordPayment={role === 'Cashier' ? handleRecordPayment : undefined}
                            paying={payingOrderId === order.id}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}

      <Modal
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Dalab #${selectedOrder.id}` : 'Faahfaahinta Dalabka'}
      >
        {selectedOrder && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-brand-cream/65">{selectedOrder.customer.name}</p>
                <p className="text-sm text-brand-cream/65">{selectedOrder.contactPhone}</p>
                <p className="text-sm text-brand-cream/65">{selectedOrder.neighborhood}</p>
              </div>
              <StatusBadge status={selectedOrder.status} />
            </div>
            <div className="space-y-3">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                  <div>
                    <p className="font-medium text-white">{item.foodName}</p>
                    <p className="text-sm text-brand-cream/60">Tiro {item.quantity}</p>
                  </div>
                  <span className="text-brand-gold">{formatCurrency(item.subtotal)}</span>
                </div>
              ))}
            </div>
            {showPrintAction(selectedOrder) && (
              <Button
                className="w-full"
                loading={printingOrderId === selectedOrder.id}
                onClick={() => handlePrintReceipt(selectedOrder.id)}
              >
                <Printer size={16} className="mr-2 inline" />
                Daabac rasiid
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ManageOrders
