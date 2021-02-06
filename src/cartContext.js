import React, { useContext, useEffect, useReducer } from 'react'
import cartReducer from './cartReducer'

const CartContext = React.createContext(null)

let initialCart
try {
  // "??" Nullish coalescing operator | If left value is null or undefined use the other on right
  initialCart = JSON.parse(localStorage.getItem('cart')) ?? []
} catch (e) {
  console.log('The cart could not be parsed into JSON', e)
  initialCart = []
}

export function CartProvider({ children }) {
  // By declaring the default state using a function,
  // it will only run the first time the component renders
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to make it easier to consume the cart context
export function useCart() {
  const context = useContext(CartContext)

  // Check if there is a wrapper CartProvider with the data
  if (!context) {
    throw Error(
      'useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error'
    )
  }
  return context
}
