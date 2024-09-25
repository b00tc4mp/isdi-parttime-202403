import './index.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// img
import logo from '../img/logo.png'
import bienvenido from '../img/bienvenido.png'
import logoutIcon from '../img/logoutIcon.png'
// logic
import logoutUser from '../../logic/logoutUser'
import fetchUserName from '../../logic/getUserName'

const Header = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token') // obtener token

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [showLogoutIcon, setShowLogoutIcon] = useState(true)

  // boton logout
  const handleLogout = () => {
    logoutUser()  // eliminamos el token
    alert('Hasta pronto!👋')
    navigate('/Login')  // redirecciona a /Login
  }

    // Efecto 'magico' boton logout
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setShowLogoutIcon(false)
        } else {
          setShowLogoutIcon(true)
        }
      }
  
      window.addEventListener('scroll', handleScroll)
  
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

  // monitorizamos el token y redirigir si es necesario
  useEffect(() => {
    // Si no hay token, hacer logout y redirigir al login
    if (!token) {
      logoutUser()
      navigate('/Login')
    }
  }, [token, navigate])

  // obtener el username
  useEffect(() => {
    const getUserName = async () => {
      try {
        const username = await fetchUserName(token)
        setUsername(username)
      } catch (err) {
        setError('Error en la solicitud')
      }
    }

    if (token) {
      getUserName()
    }
  }, [token])

  return (
    <div>
      <nav className='Nav'>
        {token ? ( // si hay token: mostrar nombre de usuario y boton logout
          <div>
            <div className='logo'>
              <a href="/"><img src={logo} alt="Logo" /></a>
            </div>

            <div className='sessionStatus'>
              <h1 style={{ color: 'orange' }}>Bienvenido <strong>{username}</strong>!</h1>
            </div>
          </div>
        ) : ( // si no hay token: mostrar bienvenido redirigir a login
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

      {/* icono logout */}
      {token && showLogoutIcon && (
        <div className="logout-icon" onClick={handleLogout}>
          <img src={logoutIcon} alt="Cerrar sesión" />
        </div>
      )}
    </div>
  )
}

export default Header