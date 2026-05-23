import api, { extractData } from './api'

const menuService = {
  async getAll() {
    const response = await api.get('/menu')
    return extractData(response) || []
  },

  async getAdminAll() {
    const response = await api.get('/menu/admin/all')
    return extractData(response) || []
  },

  async getById(id) {
    const response = await api.get(`/menu/${id}`)
    return extractData(response)
  },

  async create(payload) {
    const response = await api.post('/menu', payload)
    return extractData(response)
  },

  async update(id, payload) {
    const response = await api.put(`/menu/${id}`, payload)
    return extractData(response)
  },

  async remove(id) {
    const response = await api.delete(`/menu/${id}`)
    return extractData(response)
  },
}

export default menuService
