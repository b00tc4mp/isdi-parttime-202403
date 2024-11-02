import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCustomContext } from '../../../context/useContext'
import './index.css'
// Components
import { Button, Title } from "../../../components/core"
// Api, utils y handlers
import fetchAllUsers from '../../../logic/users/getAllUsers'
import sortUsers from '../../../utils/sortUsers'
import handleDeleteUser from '../../../handlers/users/deleteUserHandle'


const UsersList = () => {
  const [data, setData] = useState([])  // almacenar la lista de usuarios
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const navigate = useNavigate()
  const { alert, confirm } = useCustomContext()

    useEffect(() => { // Obtener la lista de usuarios del servidor
      fetchAllUsers(token, setData, setLoading, setError)
  }, [token])

  const sortedUsers = sortUsers(data) //ordenamos lista de usuarios

  const handleDelete = (id) => { 
    confirm({// confirm personalizadoS
      message: '🗑️ ¿Deseas eliminar este Usuario? 👷',
      onAccept: () => handleDeleteUser(id, token, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='UsersList'>
      <div className="RouteTitle">
        <Title>LISTA DE USUARIOS</Title>
      </div>

      {loading ? (
          <p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Cargando lista de usuarios...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error al cargar lista de usuarios: {error}</p>
        ) : (
        <ul>
          {sortedUsers.map((item) => (
            <li key={item.id}>
              <Button className={`UserDiv ${item.access}`} onClick={() => handleDelete(item.id)}>
                <div className="UserInfo"><p ><strong>Usuario:</strong>&nbsp;{item.username}</p></div>
                <div className="UserInfo"><p ><strong>Nivel de acceso:</strong>&nbsp;{item.access}</p></div>
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