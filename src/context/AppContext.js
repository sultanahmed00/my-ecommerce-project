import { createContext, useContext, useReducer, useEffect, useCallback, useMemo, createElement } from 'react'

const CART_KEY = 'shopflow_cart'
const WISHLIST_KEY = 'shopflow_wishlist'
const ADDRESS_KEY = 'shopflow_address'

const ORDER_STATUSES = ['pending', 'shipped', 'delivered']

function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quota errors */
  }
}

function generateOrderId() {
  return `SF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

const initialState = {
  cart: loadStorage(CART_KEY, []),
  wishlist: loadStorage(WISHLIST_KEY, []),
  shippingAddress: loadStorage(ADDRESS_KEY, null),
  currentOrder: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, qty } = action.payload
      const existing = state.cart.find((item) => item.id === product.id)
      const cart = existing
        ? state.cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + qty } : item
          )
        : [...state.cart, { ...product, qty }]
      return { ...state, cart }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    case 'UPDATE_CART_QTY': {
      const { id, qty } = action.payload
      if (qty < 1) {
        return { ...state, cart: state.cart.filter((item) => item.id !== id) }
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, qty } : item
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'TOGGLE_WISHLIST': {
      const product = action.payload
      const exists = state.wishlist.some((item) => item.id === product.id)
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((item) => item.id !== product.id)
          : [...state.wishlist, product],
      }
    }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      }
    case 'SET_ADDRESS':
      return { ...state, shippingAddress: action.payload }
    case 'PLACE_ORDER':
      return {
        ...state,
        currentOrder: action.payload,
        cart: [],
      }
    case 'UPDATE_ORDER_STATUS':
      if (!state.currentOrder) return state
      return {
        ...state,
        currentOrder: { ...state.currentOrder, status: action.payload },
      }
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    saveStorage(CART_KEY, state.cart)
  }, [state.cart])

  useEffect(() => {
    saveStorage(WISHLIST_KEY, state.wishlist)
  }, [state.wishlist])

  useEffect(() => {
    if (state.shippingAddress) {
      saveStorage(ADDRESS_KEY, state.shippingAddress)
    }
  }, [state.shippingAddress])

  const addToCart = useCallback((product, qty = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, qty } })
  }, [])

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }, [])

  const updateCartQty = useCallback((id, qty) => {
    dispatch({ type: 'UPDATE_CART_QTY', payload: { id, qty } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const isInWishlist = useCallback(
    (id) => state.wishlist.some((item) => item.id === id),
    [state.wishlist]
  )

  const toggleWishlist = useCallback((product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product })
  }, [])

  const removeFromWishlist = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id })
  }, [])

  const setShippingAddress = useCallback((address) => {
    dispatch({ type: 'SET_ADDRESS', payload: address })
  }, [])

  const cartTotal = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [state.cart]
  )

  const cartCount = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.qty, 0),
    [state.cart]
  )

  const placeOrder = useCallback(
    ({ paymentMethod, total }) => {
      const order = {
        id: generateOrderId(),
        status: 'pending',
        total,
        items: [...state.cart],
        paymentMethod,
        address: state.shippingAddress,
        placedAt: new Date().toISOString(),
      }
      dispatch({ type: 'PLACE_ORDER', payload: order })
      return order
    },
    [state.cart, state.shippingAddress]
  )

  const updateOrderStatus = useCallback((status) => {
    if (!ORDER_STATUSES.includes(status)) return
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: status })
  }, [])

  const value = useMemo(
    () => ({
      cart: state.cart,
      wishlist: state.wishlist,
      shippingAddress: state.shippingAddress,
      currentOrder: state.currentOrder,
      cartTotal,
      cartCount,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      setShippingAddress,
      placeOrder,
      updateOrderStatus,
      ORDER_STATUSES,
    }),
    [
      state,
      cartTotal,
      cartCount,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      setShippingAddress,
      placeOrder,
      updateOrderStatus,
    ]
  )

  return createElement(AppContext.Provider, { value }, children)
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
