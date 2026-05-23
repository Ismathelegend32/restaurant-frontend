import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import StatusBadge from '../../components/ui/StatusBadge'
import menuService from '../../services/menuService'
import orderService from '../../services/orderService'
import userService from '../../services/userService'
import { useAuth } from '../../hooks/useAuth'
import OrderStatusSelect from '../../components/ui/OrderStatusSelect'
import WhatsAppContactCard from '../../components/contact/WhatsAppContactCard'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  const loadDashboard = async () => {
    try {
      const [ordersData, usersData, menuData] = await Promise.all([
        orderService.getAll(),
        userService.getAll(),
        menuService.getAdminAll(),
      ])

      setOrders(ordersData)
      setUsers(usersData)
      setMenuItems(menuData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
    const today = new Date().toDateString()
    const ordersToday = orders.filter((order) => new Date(order.createdAt).toDateString() === today)
    const activeUsers = users.filter((user) => user.role === 'Customer').length

    return [
      { label: 'Dakhliga Guud', value: formatCurrency(revenue) },
      { label: 'Dalabyada Maanta', value: ordersToday.length },
      { label: 'Macaamiisha Firfircoon', value: activeUsers },
      { label: 'Cuntooyinka Menu-ga', value: menuItems.length },
    ]
  }, [menuItems.length, orders, users])

  const chartData = useMemo(() => {
    const grouped = orders.reduce((acc, order) => {
      const key = new Date(order.createdAt).toLocaleDateString('so-SO', {
        month: 'short',
        day: 'numeric',
      })

      acc[key] = (acc[key] || 0) + order.totalAmount
      return acc
    }, {})

    return Object.entries(grouped).map(([date, revenue]) => ({ date, revenue }))
  }, [orders])

  const updateStatus = async (orderId, status) => {
    await orderService.updateStatus(orderId, status)
    await loadDashboard()
  }

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa qaybta maamulka" />

  return (
    <div className="grid gap-6">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-gold sm:text-sm sm:tracking-[0.35em]">
          Koontaroolka Maamulka
        </p>
        <h1 className="section-title mt-2 break-words text-2xl sm:text-3xl lg:text-4xl">
          Aragti guud oo howlaha makhaayadda ah
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label} className="p-6">
            <p className="text-sm text-brand-cream/65">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
          </Card>
        ))}
      </div>

      <WhatsAppContactCard />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Isbeddelka Dakhliga</h2>
            <Link to="/staff/reports" className="text-sm text-brand-gold">
              Arag warbixinaha
            </Link>
          </div>
          <div className="mt-8 h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(245,240,232,0.08)" vertical={false} />
                <XAxis dataKey="date" stroke="#F5F0E8" />
                <YAxis stroke="#F5F0E8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A2540',
                    color: '#F5F0E8',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 16,
                    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.35)',
                  }}
                  labelStyle={{ color: '#F5F0E8' }}
                  itemStyle={{ color: '#F5F0E8' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C9A84C"
                  strokeWidth={3}
                  dot={{ fill: '#C9A84C' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl">Hawlaha Degdegga ah</h2>
          <div className="mt-6 grid gap-3">
            <Link to="/staff/menu">
              <Button className="w-full">Maamul Menu-ga</Button>
            </Link>
            <Link to="/staff/orders">
              <Button variant="outline" className="w-full">
                Maamul Dalabyada
              </Button>
            </Link>
            <Link to="/staff/users">
              <Button variant="ghost" className="w-full">
                Maamul Isticmaaleyaasha
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">Dalabyadii Ugu Dambeeyay</h2>
          <Link to="/staff/orders" className="text-sm text-brand-gold">
            Fur liiska oo dhan
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:hidden">
          {orders.slice(0, 6).map((order) => (
            <div key={order.id} className="rounded-2xl border border-brand-gold/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">Dalab #{order.id}</p>
                  <p className="mt-1 text-sm text-brand-cream/55">{order.customer.name}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <p className="mt-3 text-sm text-brand-cream/55">{formatDate(order.createdAt)}</p>
              <div className="mt-3">
                <OrderStatusSelect
                  role={user?.role}
                  currentStatus={order.status}
                  value={order.status}
                  onChange={(event) => updateStatus(order.id, event.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 hidden overflow-x-auto lg:block">
          <table className="min-w-full text-left text-sm">
            <thead className="text-brand-cream/45">
              <tr>
                <th className="pb-4">Dalab</th>
                <th className="pb-4">Macmiil</th>
                <th className="pb-4">Taariikh</th>
                <th className="pb-4">Xaalad</th>
                <th className="pb-4">Cusboonaysiin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/10">
              {orders.slice(0, 6).map((order) => (
                <tr key={order.id}>
                  <td className="py-4 font-medium text-white">#{order.id}</td>
                  <td className="py-4 text-brand-cream/85">{order.customer.name}</td>
                  <td className="py-4 text-brand-cream/85">{formatDate(order.createdAt)}</td>
                  <td className="py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-4">
                    <OrderStatusSelect
                      role={user?.role}
                      currentStatus={order.status}
                      value={order.status}
                      onChange={(event) => updateStatus(order.id, event.target.value)}
                      className="max-w-[180px]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default AdminDashboard
