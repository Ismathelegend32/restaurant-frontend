import api, { extractData } from './api'

const paymentService = {
  async record(payload) {
    const response = await api.post('/payments', payload)
    return extractData(response)
  },

  async getByOrderId(orderId) {
    const response = await api.get(`/payments/order/${orderId}`)
    return extractData(response)
  },

  async confirm(id) {
    const response = await api.patch(`/payments/${id}/confirm`)
    return extractData(response)
  },
}

export default paymentService
