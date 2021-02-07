import React from 'react'
import { useCart } from './cartContext'
import { useParams, useNavigate } from 'react-router-dom'
import { Fetch } from './services/useFetch'
import Spinner from './Spinner'
import PageNotFound from './PageNotFound'

// Custom wrapper on Details class component to be able to use hooks
export default function DetailWrapper() {
  // Getting dispatch data via Context
  const { dispatch } = useCart()

  const { id } = useParams()

  return <Detail id={id} navigate={useNavigate()} dispatch={dispatch} />
}

class Detail extends React.Component {
  state = {
    sku: '',
  }

  render() {
    const { id, navigate, dispatch } = this.props
    const { sku } = this.state

    // Children prop pattern
    return (
      <Fetch url={`products/${id}`}>
        {(product, loading, error) => {
          if (loading) return <Spinner />
          if (!product) return <PageNotFound />
          if (error) throw error

          return (
            <div id='detail'>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p id='price'>${product.price}</p>

              <select
                id='size'
                value={sku}
                onChange={(e) => this.setState({ sku: e.target.value })}
              >
                <option value=''>What size?</option>
                {product.skus.map((sku) => (
                  <option key={sku.sku} value={sku.sku}>
                    {sku.size}
                  </option>
                ))}
              </select>

              <p>
                <button
                  disabled={!sku}
                  className='btn btn-primary'
                  onClick={() => {
                    dispatch({ type: 'add', payload: { id, sku } })
                    navigate('/cart')
                  }}
                >
                  Add to cart
                </button>
              </p>
              <img src={`/images/${product.image}`} alt={product.category} />
            </div>
          )
        }}
      </Fetch>
    )
  }
}
