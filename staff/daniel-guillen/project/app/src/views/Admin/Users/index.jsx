import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './index.css'
//components
import Button from "../../../components/core/Button"
import Title from '../../../components/core/Title'
import Text from '../../../components/core/Text'
// utils y api
import sortUsers from '../../../utils/sortUsers'
import fetchAllUsers from '../../../logic/users/getAllUsers'
import handleDeleteUser from '../../../handlers/deleteUserHandle'

const UsersList = () => {
  const [data, setData] = useState([])  // almacenar la lista de usuarios
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const navigate = useNavigate()

  const getUsers = async () => {
    await fetchAllUsers(token, setData, setLoading, setError)
  }

    useEffect(() => { // Obtener la lista de usuarios
      getUsers()
  }, [token])

  const sortedUsers = sortUsers(data) //ordenamos lista de usuarios

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
              <Button className={`UserDiv ${item.access}`} onClick={() => handleDeleteUser(item.id, token, setData, setLoading, setError)}>
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