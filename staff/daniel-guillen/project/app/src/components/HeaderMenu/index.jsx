import React from 'react'
import './index.css'
//img
import logo from '../img/logo.png'

const HeaderMenu = () => {
  return (
    <nav className='Nav'>
          <div className='logo'>
            <a href="/"><img src={logo} /></a>
          </div>
          <div >
            <ul className='MenuButtons'>

              <li><a className='menu-link-start'href="/Store">ALMACEN</a></li>

              <li><a className='menu-link-center' href="/Vehicles">VEHICULOS</a></li>

              <li><a className='menu-link-end' href="/Admin">ADMIN</a></li>
                
            </ul>    
                      
          </div>
    </nav>
  )
}

export default HeaderMenu