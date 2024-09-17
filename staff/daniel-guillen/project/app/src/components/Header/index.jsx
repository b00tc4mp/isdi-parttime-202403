import './index.css'
//img
import logo from '../img/logo.png'
import bienvenido from '../img/bienvenido.png'
import logoutIcon from '../img/logoutIcon.png' // Imagen del ícono de cerrar sesión
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logoutUser from '../../logic/logoutUser'

const Header = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [showLogoutIcon, setShowLogoutIcon] = useState(true)
  const token = sessionStorage.getItem('token') // Obtener token de sessionStorage

  const handleLogout = () => {
    logoutUser()  // Elimina el token
    navigate('/Login')  // Redirecciona a /Login
  }

  useEffect(() => {
    if (!token) return; // Si no hay token, no buscamos username

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

        // Mostrar alerta de bienvenida
       // alert(`Bienvenido ${data.username}!👋`)
      } catch (err) {
        console.error('Error al obtener el nombre de usuario:', err)
        setError('Error en la solicitud')
      }
    }

    fetchUserName()
  }, [token])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowLogoutIcon(false)
      } else {
        setShowLogoutIcon(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className='Nav'>
        {token ? ( // Si hay token, mostrar nombre de usuario y cerrar sesión
          <div>
            <div className='logo'>
              <a href="/"><img src={logo} alt="Logo" /></a>
            </div>

            <div className='sessionStatus'>
              <h1 style={{ color: 'orange' }}>Bienvenido <strong>{username}</strong>!</h1>
            </div>
          </div>
        ) : ( // Si no hay token, mostrar bienvenido y enlace a login
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

      {/* Ícono de cerrar sesión */}
      {token && showLogoutIcon && (
        <div className="logout-icon" onClick={handleLogout}>
          <img src={logoutIcon} alt="Cerrar sesión" />
        </div>
      )}
    </>
  )
}

export default Header
