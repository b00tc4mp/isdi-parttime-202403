import deleteUserById from '../../logic/users/deleteUser'
import fetchAllUsers from '../../logic/users/getAllUsers'

// Función para eliminar usuario por ID
const handleDeleteUser = async (id, token, setData, setLoading, setError, alert) => {
    try {
      await deleteUserById(id, token)  // pasamos el token al eliminar usuario
      alert('👷‍♂️ Usuario eliminado exitosamente 🎉')

      // refrescar la lista después de eliminar un usuario
      fetchAllUsers(token, setData, setLoading, setError)
    } catch (error) {
      setError(error.message)
      alert('Error al eliminar Usuario:' + error)
    }
}

export default handleDeleteUser