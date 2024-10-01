import deleteUserById from '../logic/deleteUser'
// import fetchAllUsers ...

// Función para eliminar usuario por ID
const handleDeleteUser = async (id, token, setData, setLoading, setError) => {
  const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar este Usuario? 👷‍♂️')

  if (isConfirmed) {
    try {
      await deleteUserById(id, token)  // pasamos el token al eliminar usuario
      alert('👷‍♂️ Usuario eliminado exitosamente 🎉')

      // refrescar la lista después de eliminar un usuario
      fetchAllUsers(token, setData, setLoading, setError)
    } catch (error) {
      console.error('Error al eliminar Usuario:', error)
      alert(error.message)
    }
  } else {
    alert('🗑️ Eliminación cancelada ❌')
  }
}

export default handleDeleteUser