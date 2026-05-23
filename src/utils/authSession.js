import { STORAGE_KEYS } from './constants'

export const readStoredSession = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.auth)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    if (!parsed?.token) return null

    if (parsed.expiresAt && new Date(parsed.expiresAt) <= new Date()) {
      localStorage.removeItem(STORAGE_KEYS.auth)
      return null
    }

    return parsed
  } catch {
    localStorage.removeItem(STORAGE_KEYS.auth)
    return null
  }
}

export const writeStoredSession = ({ token, user, expiresAt }) => {
  localStorage.setItem(
    STORAGE_KEYS.auth,
    JSON.stringify({
      token,
      user,
      expiresAt: expiresAt || null,
    }),
  )
}

export const clearStoredSession = () => {
  localStorage.removeItem(STORAGE_KEYS.auth)
}

export const isAuthError = (error) => {
  if (error?.status === 401 || error?.status === 403) return true
  const message = (error?.message || '').toLowerCase()
  return message.includes('unauthorized') || message.includes('invalid token')
}
