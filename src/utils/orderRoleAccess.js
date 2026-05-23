import { statusLabels } from './constants'

/** Xaaladaha role kasta uu arki karo liiska dalabyada */
export const visibleStatusesByRole = {
  Admin: null,
  Cashier: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered'],
  KitchenStaff: ['Pending', 'Confirmed', 'Preparing', 'Ready'],
}

export const filterOrdersForRole = (orders, role) => {
  const allowed = visibleStatusesByRole[role]
  if (!allowed) return orders
  return orders.filter((order) => allowed.includes(order.status))
}

export const groupOrdersByStatus = (orders, statuses) =>
  statuses.reduce((acc, status) => {
    acc[status] = orders.filter((order) => order.status === status)
    return acc
  }, {})

export const statusLegendForRole = (role) => {
  const statuses = visibleStatusesByRole[role]
  if (!statuses) return []
  return statuses.map((value) => ({ value, label: statusLabels[value] || value }))
}
