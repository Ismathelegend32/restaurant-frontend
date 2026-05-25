import axios from 'axios'
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants'
import { clearStoredSession } from '../utils/authSession'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

let unauthorizedHandler = null

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler
}

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem(STORAGE_KEYS.auth)
  if (stored) {
    try {
      const { token } = JSON.parse(stored)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      clearStoredSession()
    }
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if (status === 401) {
      clearStoredSession()
      unauthorizedHandler?.()
    }

    const data = error?.response?.data
    let message = data?.errors?.length
      ? data.errors.join(' • ')
      : data?.message || error?.message || 'Something went wrong'

    if (status === 403) {
      message =
        data?.message ||
        'Ma lihid ogolaansho. Ka bax (logout) oo mar kale soo gal si token cusub u hesho.'
    }

    const isNetworkFailure =
      !error?.response &&
      (error?.code === 'ERR_NETWORK' ||
        /network error/i.test(error?.message || ''))

    if (isNetworkFailure) {
      message =
        'Server-ka lama gaarin (Network Error). Hubi internet-ka, Railway API, iyo in VITE_API_BASE_URL sax yahay.'
    }

    const wrapped = new Error(message)
    wrapped.status = status
    return Promise.reject(wrapped)
  },
)

export const extractData = (response) => response?.data?.data

export default api
