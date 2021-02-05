import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './Footer'
import Header from './Header'
import Products from './Products'
import Detail from './Detail'
import Cart from './Cart'

export default function App() {
  // By declaring the default state using a function,
  // it will only run the first time the component renders
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? []
    } catch (e) {
      console.log('The cart could not be parsed into JSON', e)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(id, sku) {
    // When we use a function on setState
    // React provides the current state as an argument
    setCart((cartItems) => {
      const itemInCart = cartItems.find((item) => {
        return item.sku === sku
      })

      if (itemInCart) {
        return cartItems.map((item) =>
          item.sku === sku
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      } else {
        // Return a new array with new item appended
        return [
          ...cartItems,
          {
            id,
            sku,
            quantity: 1,
          },
        ]
      }
    })
  }

  function updateQuantity(sku, quantity) {
    setCart((cartItems) => {
      return quantity === 0
        ? cartItems.filter((item) => item.sku !== sku)
        : cartItems.map((item) =>
            item.sku === sku
              ? {
                  ...item,
                  quantity,
                }
              : item
          )
    })
  }

  return (
    <>
      <div className='content'>
        <Header />
        <main>
          <Routes>
            <Route
              path='/'
              element={<h1>Welcome to Carved Rock Fitness</h1>}
            ></Route>
            <Route path='/:category' element={<Products />}></Route>
            <Route
              path='/:category/:id'
              element={<Detail addToCart={addToCart} />}
            ></Route>
            <Route
              path='/cart'
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            ></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}
