const PRODUCTION_API_BASE_URL = 'https://new-jubba-api-production.up.railway.app/api'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  (import.meta.env.PROD ? PRODUCTION_API_BASE_URL : 'http://localhost:5000/api')

export const STORAGE_KEYS = {
  auth: 'new-jubba-auth',
  cart: 'new-jubba-cart',
  profileDraft: 'new-jubba-profile-draft',
  registerDraft: 'new-jubba-register-draft',
  checkoutDraft: 'new-jubba-checkout-draft',
  menuFilters: 'new-jubba-menu-filters',
}

export const neighborhoods = [
  'Hodan',
  'Hamarweyne',
  'Xamar Jajab',
  'Bondhere',
  'Waberi',
  'Dharkenley',
  'Yaqshid',
  'Kaaraan',
  'Hawl Wadaag',
  'Shangaani',
]

export const menuCategories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']

export const menuItemCategories = menuCategories.filter((category) => category !== 'All')

export const menuCategoryLabels = {
  All: 'Dhammaan',
  Starters: 'Bilow',
  Mains: 'Cuntooyinka Waaweyn',
  Desserts: 'Macmacaanka',
  Drinks: 'Cabitaannada',
}

export const paymentMethods = ['EVC', 'Edahab', 'Merchant']

export const paymentMethodLabels = {
  EVC: 'EVC Plus',
  Edahab: 'eDahab',
  Merchant: 'Merchant',
  Cash: 'Lacag Caddaan',
  'Mobile Money': 'Mobile Money',
}

export const restaurantContact = {
  whatsapp: {
    display: '+252 61 053 9207',
    e164: '252610539207',
    local: '610539207',
  },
  email: 'ismacildahir46@gmail.com',
  address: 'Dayniile, Wadada Warshadaha, Tarqa iyo Sigarka, Mogadishu',
}

export const whatsappUrl = `https://wa.me/${restaurantContact.whatsapp.e164}`

export const buildContactWhatsAppUrl = (message) =>
  `${whatsappUrl}?text=${encodeURIComponent(message)}`

export const STAFF_ROLES = ['Admin', 'Cashier', 'KitchenStaff']

export const roleDashboardPaths = {
  Admin: '/staff/dashboard',
  Customer: '/dashboard',
  Cashier: '/staff/cashier',
  KitchenStaff: '/staff/kitchen',
}

export const staffSectionTitles = {
  Admin: 'Maamulka Guud',
  Cashier: 'Qaybta Qasnajiga',
  KitchenStaff: 'Qaybta Jikada',
}

export const roleLabels = {
  Admin: 'Maamule',
  Customer: 'Macmiil',
  Cashier: 'Qasnajiga',
  KitchenStaff: 'Jikada',
}

export const inferMenuCategory = (item = {}) => {
  if (item.category) return item.category
  const source = `${item.foodName || item.name || ''} ${item.description || ''}`.toLowerCase()
  if (/(juice|tea|coffee|drink|soda|water|smoothie)/.test(source)) return 'Drinks'
  if (/(cake|dessert|ice cream|sweet|halwa|fruit)/.test(source)) return 'Desserts'
  if (/(soup|salad|starter|sambusa|appetizer)/.test(source)) return 'Starters'
  return 'Mains'
}

export const diningHighlights = [
  {
    title: 'Dhadhan Soomaaliyeed oo Saxeex ah',
    copy: 'Dhadhannadii Soomaalida oo loo qaaday heer sare oo muuqaal iyo martigelin casri ah leh.',
  },
  {
    title: 'Dalab iyo Gaarsiin Heer Sare ah',
    copy: 'Baadh, dalbo, la soco, oo hel cuntadaada adigoo maraya hab fudud oo qurux badan.',
  },
  {
    title: 'Shaqo Wadaag Dhameystiran',
    copy: 'Jikada, qasnajiga, iyo maamulka oo ku mideysan nidaam hal meel ah oo nadiif ah.',
  },
]

export const locationDetails = {
  label: 'Dayniile, Wadada Warshadaha, Tarqa iyo Sigarka',
  address: 'New Jubba Restaurant, Dayniile, Wadada Warshadaha, Tarqa iyo Sigarka, Muqdisho, Soomaaliya',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Dayniile%20Wadada%20Warshadaha%20Tarqa%20iyo%20Sigarka%20Mogadishu%20Somalia&output=embed',
}

export const statusConfig = {
  Pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Confirmed: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  Preparing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Ready: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Delivered: 'bg-green-500/20 text-green-300 border-green-500/30',
  Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
  Paid: 'bg-green-500/20 text-green-300 border-green-500/30',
  Failed: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export const statusLabels = {
  Pending: 'Sugaya',
  Confirmed: 'La Xaqiijiyay',
  Preparing: 'La Diyaarinayo',
  Ready: 'Diyaar',
  Delivered: 'La Geeyay',
  Cancelled: 'La Joojiyay',
  Paid: 'La Bixiyay',
  Failed: 'Fashilmay',
}

export const statusOptions = [
  { value: 'Pending', label: 'Sugaya' },
  { value: 'Confirmed', label: 'La Xaqiijiyay' },
  { value: 'Preparing', label: 'La Diyaarinayo' },
  { value: 'Ready', label: 'Diyaar' },
  { value: 'Delivered', label: 'La Geeyay' },
  { value: 'Cancelled', label: 'La Joojiyay' },
]

/** Xaaladaha role kasta uu beddeli karo */
export const statusOptionsByRole = {
  Admin: statusOptions,
  Cashier: [
    { value: 'Confirmed', label: 'La Xaqiijiyay' },
    { value: 'Delivered', label: 'La Geeyay' },
  ],
  KitchenStaff: [
    { value: 'Preparing', label: 'La Diyaarinayo' },
    { value: 'Ready', label: 'Diyaar' },
  ],
}

export const filterOptionsByRole = {
  Admin: [{ value: 'All', label: 'Dhammaan' }, ...statusOptions],
  Cashier: [
    { value: 'All', label: 'Dhammaan' },
    { value: 'Pending', label: 'Sugaya' },
    { value: 'Confirmed', label: 'La Xaqiijiyay' },
    { value: 'Preparing', label: 'La Diyaarinayo' },
    { value: 'Ready', label: 'Diyaar' },
    { value: 'Delivered', label: 'La Geeyay' },
  ],
  KitchenStaff: [
    { value: 'All', label: 'Dhammaan' },
    { value: 'Pending', label: 'Sugaya' },
    { value: 'Confirmed', label: 'La Xaqiijiyay' },
    { value: 'Preparing', label: 'La Diyaarinayo' },
    { value: 'Ready', label: 'Diyaar' },
  ],
}

export const getStatusOptionsForRole = (role) => statusOptionsByRole[role] || statusOptions

export const getFilterOptionsForRole = (role) => filterOptionsByRole[role] || filterOptionsByRole.Admin

export const getAllowedNextStatuses = (role, currentStatus) => {
  if (role === 'Admin') return statusOptions.map((s) => s.value)
  if (role === 'KitchenStaff') {
    if (currentStatus === 'Ready') return ['Ready']
    if (currentStatus === 'Preparing') return ['Preparing', 'Ready']
    return ['Preparing', 'Ready']
  }
  if (role === 'Cashier') {
    if (currentStatus === 'Pending') return ['Confirmed']
    if (currentStatus === 'Ready') return ['Delivered']
    return []
  }
  return []
}
