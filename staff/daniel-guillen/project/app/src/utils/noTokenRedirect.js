import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoutUser from '../logic/logoutUser'

const useAuthRedirect = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState(null)

    useEffect(() => {
        const tokenFromStorage = sessionStorage.getItem('token') // Obtener el token de sessionStorage
        if (!tokenFromStorage) { // si hay error al obtener token
            logoutUser() // Llama a logoutUser para eliminar el token y la referencia
            navigate('/login') // Redirigir al login para empezar de nuevo
        } else {
            setToken(tokenFromStorage) // traer el token si esta en sessionStorage
        }
    }, [navigate])

    return token
}

export default useAuthRedirect
