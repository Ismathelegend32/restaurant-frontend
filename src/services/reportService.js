import api, { extractData } from './api'

const reportService = {
  async getDailySales() {
    const response = await api.get('/reports/sales/daily')
    return extractData(response)
  },

  async getMonthlySales() {
    const response = await api.get('/reports/sales/monthly')
    return extractData(response)
  },

  async getOrderSummary() {
    const response = await api.get('/reports/orders/summary')
    return extractData(response) || []
  },

  async getTopItems() {
    const response = await api.get('/reports/top-items')
    return extractData(response) || []
  },

  async getFullReport() {
    const response = await api.get('/reports/full')
    return extractData(response)
  },
}

export default reportService
