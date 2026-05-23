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

export const fallbackMenuItems = [
  {
    id: 1001,
    foodName: 'Jubba Special Bariis',
    description: 'Fragrant basmati rice, grilled chicken, raisins, and our signature Somali spice finish.',
    category: 'Mains',
    price: 9.99,
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1002,
    foodName: 'Suqaar Platter',
    description: 'Tender beef suqaar served with warm canjeero, fresh herbs, and market salad.',
    category: 'Mains',
    price: 11.99,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1003,
    foodName: 'Mango Lassi',
    description: 'Refreshing chilled mango yogurt drink with cardamom and a gold finish.',
    category: 'Drinks',
    price: 3.5,
    imageUrl:
      'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1004,
    foodName: 'Chicken Shawarma Roll',
    description: 'Chargrilled chicken wrapped with garlic sauce, pickles, and crisp slaw.',
    category: 'Starters',
    price: 6.75,
    imageUrl:
      'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1005,
    foodName: 'Sambusa Trio',
    description: 'Golden sambusa filled with spiced beef, vegetables, and fragrant herbs.',
    category: 'Starters',
    price: 4.99,
    imageUrl:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1006,
    foodName: 'Lamb Hanid Rice',
    description: 'Slow-cooked lamb over aromatic rice with roasted onions and rich broth.',
    category: 'Mains',
    price: 14.5,
    imageUrl:
      'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1007,
    foodName: 'Grilled Salmon Bowl',
    description: 'Premium salmon with saffron rice, lemon butter, and seasonal vegetables.',
    category: 'Mains',
    price: 16.75,
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1008,
    foodName: 'Avocado Citrus Salad',
    description: 'Creamy avocado, orange segments, rocket leaves, and toasted seeds.',
    category: 'Starters',
    price: 7.25,
    imageUrl:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1009,
    foodName: 'Qahwa Reserve',
    description: 'Traditional Somali coffee with clove, cardamom, and cinnamon aroma.',
    category: 'Drinks',
    price: 2.95,
    imageUrl:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1010,
    foodName: 'Tamarind Sparkler',
    description: 'Chilled tamarind cooler with mint, citrus, and sparkling finish.',
    category: 'Drinks',
    price: 3.95,
    imageUrl:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1011,
    foodName: 'Date Caramel Cake',
    description: 'Moist date sponge with caramel glaze and whipped cream.',
    category: 'Desserts',
    price: 5.5,
    imageUrl:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1012,
    foodName: 'Pistachio Milk Cake',
    description: 'Soft milk cake layered with pistachio cream and saffron drizzle.',
    category: 'Desserts',
    price: 6.25,
    imageUrl:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1013,
    foodName: 'Royal Beef Steak',
    description: 'Juicy premium steak with pepper sauce, mashed potato, and charred greens.',
    category: 'Mains',
    price: 18.9,
    imageUrl:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1014,
    foodName: 'Jubba Mocktail Flight',
    description: 'A trio of passionfruit, hibiscus, and lime signature mocktails.',
    category: 'Drinks',
    price: 7.8,
    imageUrl:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1015,
    foodName: 'Spiced Lentil Soup',
    description: 'Velvety lentil soup with cumin oil, herbs, and toasted flatbread.',
    category: 'Starters',
    price: 4.75,
    imageUrl:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
  {
    id: 1016,
    foodName: 'Malawah Honey Stack',
    description: 'Warm malawah layered with honey butter, cream, and crushed nuts.',
    category: 'Desserts',
    price: 5.95,
    imageUrl:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    isAvailable: true,
  },
]

export const featuredFallbackMenu = fallbackMenuItems.slice(0, 6)

export const homeGalleryImages = [
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
]

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
