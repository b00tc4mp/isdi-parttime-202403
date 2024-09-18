import './index.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// img
import logo from '../img/logo.png'
import bienvenido from '../img/bienvenido.png'
import logoutIcon from '../img/logoutIcon.png'
// logic
import logoutUser from '../../logic/logoutUser'

const Header = () => {

  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [showLogoutIcon, setShowLogoutIcon] = useState(true)

  const handleLogout = () => {
    logoutUser()  // eliminamos el token
    navigate('/Login')  // redirecciona a /Login
  }

  useEffect(() => {
    if (!token) return; // si no hay token, no buscamos username

    // Obtener username
    const fetchUserName = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/getUserName`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // enviar token
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Error al obtener username')
        }

        const data = await response.json()
        setUsername(data.username)

      } catch (err) {
        console.error('Error al obtener el nombre de usuario:', err)
        setError('Error en la solicitud')
      }
    }

    fetchUserName()
  }, [token])

  // efecto para logout
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowLogoutIcon(false)
      } else {
        setShowLogoutIcon(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // desaparece al hacer scrooll
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <nav className='Nav'>
        {token ? ( // Si hay token: mostrar nombre de usuario y boton logout de cerrar sesion
          <div>
            <div className='logo'>
              <a href="/"><img src={logo} alt="Logo" /></a>
            </div>

            <div className='sessionStatus'>
              <h1 style={{ color: 'orange' }}>Bienvenido <strong>{username}</strong>!</h1>
            </div>
          </div>

        ) : ( // Si no hay token: mostrar bienvenido y enlace a login
          <div>

            <div className='logo'>
              <a href="#" onClick={() => navigate('/Login')}><img src={bienvenido} alt="Logo" /></a>
            </div>

            <div className='sessionStatus'>
              <h1 style={{ color: 'orange' }}>
                <a href="#" onClick={() => navigate('/Login')} style={{ color: 'orange', textDecoration: 'none' }}>
                  {error || 'Por favor, identifíquese...'}
                </a>
              </h1>
            </div>
          </div>
        )}
      </nav>

      {/* icono de cerrar sesión */}
      {token && showLogoutIcon && (
        <div className="logout-icon" onClick={handleLogout}>
          <img src={logoutIcon} alt="Cerrar sesión" />
        </div>
      )}
    </div>
  )
}

export default Header
