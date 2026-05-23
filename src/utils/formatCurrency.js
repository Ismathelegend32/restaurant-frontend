export const formatCurrency = (value) => {
  return new Intl.NumberFormat('so-SO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Number(value || 0))
}
