import deleteUserById from '../logic/deleteUser'
import fetchAllUsers from '../logic/getAllUsers'

// Función para eliminar usuario por ID
const handleDeleteUser = async (id, token, setData, setLoading, setError) => {
  const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar este Usuario? 👷‍♂️')

  if (isConfirmed) {
    try {
      await deleteUserById(id, token)  // solicitar api eliminar usuario
      alert('👷‍♂️ Usuario eliminado exitosamente 🎉')

      fetchAllUsers(token, setData, setLoading, setError) // refrescar la lista después de eliminar un usuario
      // setData(prevData => prevData.filter(user => user.id !== userId)) // Eliminar de la lista localmente sin necesidad de rellamar a fetchAllUsers
    } catch (error) {
      console.error('Error al eliminar Usuario:', error)
      alert(error.message)
    }
  } else {
    alert('🗑️ Eliminación cancelada ❌')
  }
}

export default handleDeleteUser