import api, { extractData } from './api'

const userService = {
  async getAll() {
    const response = await api.get('/users')
    return extractData(response) || []
  },

  async create(payload) {
    const response = await api.post('/users', payload)
    return extractData(response)
  },

  async getById(id) {
    const response = await api.get(`/users/${id}`)
    return extractData(response)
  },

  async updateRole(id, role) {
    const response = await api.patch(`/users/${id}/role`, { role })
    return extractData(response)
  },

  async updatePassword(id, password) {
    const response = await api.patch(`/users/${id}/password`, { password })
    return extractData(response)
  },

  async remove(id) {
    const response = await api.delete(`/users/${id}`)
    return extractData(response)
  },
}

export default userService
