import { createContext, useEffect, useMemo, useReducer } from 'react'
import toast from 'react-hot-toast'
import authService from '../services/authService'
import { setUnauthorizedHandler } from '../services/api'
import { roleDashboardPaths } from '../utils/constants'
import {
  clearStoredSession,
  isAuthError,
  readStoredSession,
  writeStoredSession,
} from '../utils/authSession'

const AuthContext = createContext(null)

const initialState = {
  user: null,
  token: null,
  expiresAt: null,
  loading: true,
  initialized: false,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.payload,
        loading: false,
        initialized: true,
      }
    case 'START_LOADING':
      return { ...state, loading: true }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt || null,
        loading: false,
        initialized: true,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
        initialized: true,
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearStoredSession()
      dispatch({ type: 'LOGOUT' })
    })
  }, [])

  useEffect(() => {
    const initialize = async () => {
      const stored = readStoredSession()
      if (!stored) {
        dispatch({ type: 'INIT', payload: { user: null, token: null, expiresAt: null } })
        return
      }

      // Soo celi session-ka isla markiiba (browser xiran kadibna wuu sii shaqaynayaa)
      dispatch({
        type: 'INIT',
        payload: {
          user: stored.user || null,
          token: stored.token,
          expiresAt: stored.expiresAt || null,
        },
      })

      try {
        const user = await authService.me()
        writeStoredSession({
          token: stored.token,
          user,
          expiresAt: stored.expiresAt,
        })
        dispatch({
          type: 'INIT',
          payload: {
            user,
            token: stored.token,
            expiresAt: stored.expiresAt || null,
          },
        })
      } catch (error) {
        if (isAuthError(error)) {
          clearStoredSession()
          dispatch({ type: 'INIT', payload: { user: null, token: null, expiresAt: null } })
          return
        }

        // Backend offline — ha tirtirin session-ka kaydsan
        if (!stored.user) {
          dispatch({ type: 'INIT', payload: { user: null, token: null, expiresAt: null } })
        }
      }
    }

    initialize()
  }, [])

  const persistSession = (payload) => {
    writeStoredSession(payload)
    dispatch({ type: 'LOGIN_SUCCESS', payload })
  }

  const login = async (values) => {
    dispatch({ type: 'START_LOADING' })
    try {
      const data = await authService.login(values)
      persistSession(data)
      toast.success(`Ku soo dhawoow, ${data.user.name}`)
      return roleDashboardPaths[data.user.role] || '/'
    } catch (error) {
      dispatch({ type: 'INIT', payload: { user: null, token: null, expiresAt: null } })
      toast.error(error.message)
      throw error
    }
  }

  const register = async (values) => {
    dispatch({ type: 'START_LOADING' })
    try {
      const data = await authService.register(values)
      persistSession(data)
      toast.success('Akoon cusub waa la sameeyay')
      return roleDashboardPaths[data.user.role] || '/'
    } catch (error) {
      dispatch({ type: 'INIT', payload: { user: null, token: null, expiresAt: null } })
      toast.error(error.message)
      throw error
    }
  }

  const logout = () => {
    clearStoredSession()
    dispatch({ type: 'LOGOUT' })
    toast.success('Si guul leh ayaad uga baxday')
  }

  const refreshProfile = async () => {
    if (!state.token) return
    try {
      const user = await authService.me()
      dispatch({ type: 'UPDATE_USER', payload: user })
      writeStoredSession({
        token: state.token,
        user,
        expiresAt: state.expiresAt,
      })
    } catch (error) {
      if (isAuthError(error)) {
        logout()
      }
    }
  }

  const updateLocalProfile = (updates) => {
    const nextUser = { ...state.user, ...updates }
    dispatch({ type: 'UPDATE_USER', payload: updates })
    writeStoredSession({
      token: state.token,
      user: nextUser,
      expiresAt: state.expiresAt,
    })
  }

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.token && state.user),
      login,
      register,
      logout,
      refreshProfile,
      updateLocalProfile,
    }),
    [state],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
