const deleteUserById = async (id, token) => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}user/deleteUser/${id}`, {
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
  
  export default deleteUserById