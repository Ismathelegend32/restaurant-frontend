import { createContext, useEffect, useMemo, useReducer } from 'react'
import toast from 'react-hot-toast'
import { STORAGE_KEYS } from '../utils/constants'

const CartContext = createContext(null)

const initialState = {
  items: [],
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return { items: action.payload || [] }
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }

      return { items: [...state.items, action.payload] }
    }
    case 'UPDATE_QUANTITY':
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.id !== action.payload) }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.cart)
    let items = []

    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        items = Array.isArray(parsed) ? parsed : []
      } catch {
        localStorage.removeItem(STORAGE_KEYS.cart)
      }
    }

    dispatch({ type: 'INIT', payload: items })
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item) => {
    if (!item?.id) {
      toast.error('Cuntadan lama dari karo gaariga (ID maqan)')
      return
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...item,
        quantity: item.quantity || 1,
      },
    })
    toast.success(`${item.foodName} waxaa lagu daray gaariga`)
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    toast.success('Cuntada waa laga saaray gaariga')
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR' })
  }

  const value = useMemo(() => {
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)

    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }
  }, [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
