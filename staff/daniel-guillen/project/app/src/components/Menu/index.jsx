import React from 'react'
import './index.css'
import logo from './logo.jpg'

const Menu = () => {
  return (
    <div>
    <nav className='Nav'>
          <div className='logo'> 
            <a href="/"><img src={logo} /></a>
          </div>
    </nav>
    <div >
            <ul className='menu'>
                <li><a className='menu-link-start' href="/Store">INVENTRARIO</a></li>
                <li><a className='menu-link-center' href="/Departures">SALIDAS</a></li>
                <li><a className='menu-link-center' href="/Fleet">VEHICULOS</a></li>
                <li><a className='menu-link-end' href="/Users">USUARIOS</a></li>
            </ul>
          </div>
    </div>
  )
}

export default Menu