import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// NavLink allows to set an active style when the url matches with the route

const activeStyle = {
  color: 'purple',
}

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>
              <img alt='Carved Rock Fitness' src='/images/logo.png' />
            </Link>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to='/shoes'>
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to='/cart'>
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
