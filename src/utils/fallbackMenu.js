import { menuFallbackImageUrls } from './cloudinaryAssets'

const fallbackMenuSeed = [
  { id: 1001, foodName: 'Jubba Special Bariis', description: 'Fragrant basmati rice, grilled chicken, raisins, and our signature Somali spice finish.', category: 'Mains', price: 9.99, isAvailable: true },
  { id: 1002, foodName: 'Suqaar Platter', description: 'Tender beef suqaar served with warm canjeero, fresh herbs, and market salad.', category: 'Mains', price: 11.99, isAvailable: true },
  { id: 1003, foodName: 'Mango Lassi', description: 'Refreshing chilled mango yogurt drink with cardamom and a gold finish.', category: 'Drinks', price: 3.5, isAvailable: true },
  { id: 1004, foodName: 'Chicken Shawarma Roll', description: 'Chargrilled chicken wrapped with garlic sauce, pickles, and crisp slaw.', category: 'Starters', price: 6.75, isAvailable: true },
  { id: 1005, foodName: 'Sambusa Trio', description: 'Golden sambusa filled with spiced beef, vegetables, and fragrant herbs.', category: 'Starters', price: 4.99, isAvailable: true },
  { id: 1006, foodName: 'Lamb Hanid Rice', description: 'Slow-cooked lamb over aromatic rice with roasted onions and rich broth.', category: 'Mains', price: 14.5, isAvailable: true },
  { id: 1007, foodName: 'Grilled Salmon Bowl', description: 'Premium salmon with saffron rice, lemon butter, and seasonal vegetables.', category: 'Mains', price: 16.75, isAvailable: true },
  { id: 1008, foodName: 'Avocado Citrus Salad', description: 'Creamy avocado, orange segments, rocket leaves, and toasted seeds.', category: 'Starters', price: 7.25, isAvailable: true },
  { id: 1009, foodName: 'Qahwa Reserve', description: 'Traditional Somali coffee with clove, cardamom, and cinnamon aroma.', category: 'Drinks', price: 2.95, isAvailable: true },
  { id: 1010, foodName: 'Tamarind Sparkler', description: 'Chilled tamarind cooler with mint, citrus, and sparkling finish.', category: 'Drinks', price: 3.95, isAvailable: true },
  { id: 1011, foodName: 'Date Caramel Cake', description: 'Moist date sponge with caramel glaze and whipped cream.', category: 'Desserts', price: 5.5, isAvailable: true },
  { id: 1012, foodName: 'Pistachio Milk Cake', description: 'Soft milk cake layered with pistachio cream and saffron drizzle.', category: 'Desserts', price: 6.25, isAvailable: true },
  { id: 1013, foodName: 'Royal Beef Steak', description: 'Juicy premium steak with pepper sauce, mashed potato, and charred greens.', category: 'Mains', price: 18.9, isAvailable: true },
  { id: 1014, foodName: 'Jubba Mocktail Flight', description: 'A trio of passionfruit, hibiscus, and lime signature mocktails.', category: 'Drinks', price: 7.8, isAvailable: true },
  { id: 1015, foodName: 'Spiced Lentil Soup', description: 'Velvety lentil soup with cumin oil, herbs, and toasted flatbread.', category: 'Starters', price: 4.75, isAvailable: true },
  { id: 1016, foodName: 'Malawah Honey Stack', description: 'Warm malawah layered with honey butter, cream, and crushed nuts.', category: 'Desserts', price: 5.95, isAvailable: true },
]

export const FALLBACK_MENU_COUNT = fallbackMenuSeed.length

export const fallbackMenuItems = fallbackMenuSeed.map((item, index) => ({
  ...item,
  imageUrl: menuFallbackImageUrls[index] ?? menuFallbackImageUrls[0],
}))

export const featuredFallbackMenu = fallbackMenuItems.slice(0, 6)
