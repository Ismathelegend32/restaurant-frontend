import api, { extractData } from './api'

const orderService = {
  async placeOrder(payload) {
    const response = await api.post('/orders', payload)
    return extractData(response)
  },

  async getMyOrders() {
    const response = await api.get('/orders/my')
    return extractData(response) || []
  },

  async getAll() {
    const response = await api.get('/orders')
    return extractData(response) || []
  },

  async getById(id) {
    const response = await api.get(`/orders/${id}`)
    return extractData(response)
  },

  async updateStatus(id, status) {
    const response = await api.patch(`/orders/${id}/status`, { status })
    return extractData(response)
  },

  async cancel(id) {
    const response = await api.delete(`/orders/${id}`)
    return extractData(response)
  },
}

export default orderService
