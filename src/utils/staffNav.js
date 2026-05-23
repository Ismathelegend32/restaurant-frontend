import {
  BarChart3,
  ChefHat,
  CreditCard,
  LayoutDashboard,
  MenuSquare,
  ReceiptText,
  Users,
} from 'lucide-react'

export const staffNavByRole = {
  Admin: [
    { to: '/staff/dashboard', label: 'Koontarool', shortLabel: 'Koontarool', icon: LayoutDashboard, end: true },
    { to: '/staff/menu', label: 'Maamul Menu-ga', shortLabel: 'Menu', icon: MenuSquare },
    { to: '/staff/orders', label: 'Maamul Dalabyada', shortLabel: 'Dalabyo', icon: ReceiptText },
    { to: '/staff/users', label: 'Maamul Isticmaaleyaasha', shortLabel: 'Dadka', icon: Users },
    { to: '/staff/reports', label: 'Warbixinno', shortLabel: 'Warbixin', icon: BarChart3 },
  ],
  Cashier: [
    { to: '/staff/cashier', label: 'Lacag-bixinta', shortLabel: 'Lacag', icon: CreditCard, end: true },
    { to: '/staff/orders', label: 'Dalabyada', shortLabel: 'Dalabyo', icon: ReceiptText },
  ],
  KitchenStaff: [
    { to: '/staff/kitchen', label: 'Jikada', shortLabel: 'Jikada', icon: ChefHat, end: true },
    { to: '/staff/orders', label: 'Dalabyada', shortLabel: 'Dalabyo', icon: ReceiptText },
  ],
}

export const getStaffNav = (role) => staffNavByRole[role] || []
