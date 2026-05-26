import api, { extractData } from './api'

const authService = {
  async login(payload) {
    const response = await api.post('/auth/login', payload)
    return extractData(response)
  },

  async register(payload) {
    const response = await api.post('/auth/register', payload)
    return extractData(response)
  },

  async me() {
    const response = await api.get('/auth/me')
    return extractData(response)
  },

  async updateProfile(payload) {
    const response = await api.patch('/auth/profile', payload)
    return extractData(response)
  },
}

export default authService
