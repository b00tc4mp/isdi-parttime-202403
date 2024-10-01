import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './index.css'
//components
import Button from "../../../components/core/Button"
import Title from '../../../components/core/Title'
import Text from '../../../components/core/Text'
// utils
import sortUsers from '../../../utils/sortUsers'

const UsersList = () => {
  const [data, setData] = useState([])  // almacenar la lista de usuarios
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const navigate = useNavigate()

  const fetchAllUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}users/getAllUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener lista de Usuarios')
      }

      const result = await response.json()
      setData(result)
      console.log('Usuarios recibidos del servidor:', result)
    } catch (error) {
      setError(error.message)
      console.error('Error al obtener lista de Usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  // obtener la lista de usuarios cuando se monta el componente
  useEffect(() => {
    fetchAllUsers()
  }, [token])

  const deleteUserById = async (id) => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}users/deleteUser/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
  
      if (!apiResponse.ok) {
        throw new Error('Error al eliminar Usuario')
      }
  
      return { message: 'Usuario eliminado exitosamente' }
    } catch (error) {
      throw new Error('Error al eliminar Usuario. Inténtalo de nuevo más tarde.')
    }
  }

  // Función para eliminar usuario por ID
  const handleDeleteUser = async (id) => {
    const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar este Usuario? 👷‍♂️')

    if (isConfirmed) {
      try {
        await deleteUserById(id)  // ya no pasamos el token, se maneja directamente en deleteUserById
        alert('👷‍♂️ Usuario eliminado exitosamente 🎉')

        // refrescar la lista después de eliminar un usuario
        fetchAllUsers()  // No necesitamos pasar setData, setLoading, etc.
      } catch (error) {
        console.error('Error al eliminar Usuario:', error)
        alert(error.message)
      }
    } else {
      alert('🗑️ Eliminación cancelada ❌')
    }
  }
  //ordenamos lista de usuarios
  const sortedUsers = sortUsers(data)
  return (
    <div className='UsersList'>
      <div className="RouteTitle">
        <Title>LISTA DE USUARIOS</Title>
      </div>

      {/* Mostrar el estado de carga */}
      {loading && <p>Cargando usuarios...</p>}

      {/* Mostrar el mensaje de error si ocurre */}
      {error && <p>Error: {error}</p>}

      {/* Mapeamos la lista de usuarios */}
      {!loading && !error && (
        <ul>
          {sortedUsers.map((item) => (
            <li key={item.id}>
              <Button className={`UserDiv ${item.access}`} onClick={() => handleDeleteUser(item.id)}>
                <Text className="UserInfo">Nombre de Usuario:</Text>{item.username}<br/>
                <Text className="UserInfo">Acceso:</Text>{item.access}
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Button className="return" onClick={() => navigate('/Admin')}>⬅️ VOLVER</Button>
    </div>
  )
}

export default UsersList