import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './cartContext'
import useFetchAll from './services/useFetchAll'
import Spinner from './Spinner'

export default function Cart() {
  // Getting cart and dipatch data via Context
  const { cart, dispatch } = useCart()

  const navigate = useNavigate()
  const urls = cart.map((i) => `products/${i.id}`)
  const { data: products, loading, error } = useFetchAll(urls)

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    )
    const { size } = skus.find((s) => s.sku === sku)

    return (
      <li key={sku} className='cart-item'>
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) =>
                dispatch({
                  type: 'updateQuantity',
                  payload: { sku, quantity: parseInt(e.target.value) },
                })
              }
              value={quantity}
            >
              <option value='0'>Remove</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </p>
        </div>
      </li>
    )
  }

  if (loading) return <Spinner />
  if (error) throw error

  // Deriving state
  // Derive state when possible
  // If derive state calculation is heavy it is opssible to use useMemo() hook
  const numItemsInCart = cart.reduce(
    (total, currentItem) => total + currentItem.quantity,
    0
  )

  return (
    <section id='cart'>
      <h1>Cart</h1>
      <p>
        {cart.length
          ? `${numItemsInCart} item${numItemsInCart > 1 ? 's' : ''} in my cart`
          : 'Cart is empty'}
      </p>

      <ul>{cart.map(renderItem)}</ul>

      {cart.length > 0 && (
        <button
          type='submit'
          className='btn btn-primary'
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      )}
    </section>
  )
}
