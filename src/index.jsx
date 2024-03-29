import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import { CartProvider } from './cartContext'

/*
  Even with ErrorBoundary error stack traces will still show up on development mode,
  click on 'x' to see what the user will se in production
*/

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
)
