import React from 'react'
import Icon from '../icons/cloudy.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='main-head'>
      <nav>
        <div className='logo'>
          <img src={Icon} alt='logo' />
          <h1>Weather Indoors App</h1>
        </div>
        <ul>
          <Link to='/'>
            <li>
              Home
            </li>
          </Link>
          <Link to='/weather'>
            <li>
              Weather Application
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
