import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from './services/useFetch'
import Spinner from './Spinner'
import PageNotFound from './PageNotFound'

export default function Detail({ addToCart }) {
  const { id } = useParams()
  const skuRef = useRef()
  const navigate = useNavigate()
  const { data: product, loading, error } = useFetch(`products/${id}`)

  if (loading) return <Spinner />
  if (!product) return <PageNotFound />
  if (error) throw error

  return (
    <div id='detail'>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id='price'>${product.price}</p>

      {/* skuRef holds a reference to <select> html element */}
      {/*
        Select below is an uncontrolled component,
        React has no control on select value, the HTML element itself holds the value
      */}
      <select id='size' ref={skuRef}>
        <option value=''>What size?</option>
        {product.skus.map((sku) => (
          <option key={sku.sku} value={sku.sku}>
            {sku.size}
          </option>
        ))}
      </select>

      <p>
        <button
          className='btn btn-primary'
          onClick={() => {
            const sku = skuRef.current.value
            if (!sku) {
              return alert('Select size.')
            }
            addToCart(id, sku)
            navigate('/cart')
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  )
}
