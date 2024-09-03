import './index.css'
//img
import logo from '../img/logo.png'
import Button from '../core/Button'

import logoutUser from '../../logic/logoutUser'
import { useNavigate } from 'react-router-dom'

const HeaderMenu = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    
    logoutUser()  // Elimina el token
    navigate('/Login')  // => /Login
  }


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

              <Button onClick={handleLogout}>😴</Button>

                
            </ul>    
                      
          </div>
    </nav>
  )
}

export default HeaderMenu