import React from 'react'
import './index.css'
//img
import logo from '../img/logo.png'
import Button from '../core/Button'
import app from '../../utils/config'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(app)

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

              <li><a className='menu-link-center' href="/Admin">ADMIN</a></li>

              <Button onClick={() => signOut(auth)}>cerrar sesion</Button>

                
            </ul>    
                      
          </div>
    </nav>
  )
}

export default HeaderMenu