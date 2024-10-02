const deleteUserById = async (userId, token) => {
  try {
  const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}users/deleteUser/${userId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
    })

    if (!apiResponse.ok) {
        const result = await apiResponse.json()
        throw new Error(result.message || 'Error al eliminar usuario')
    }

  return { message: 'Usuario eliminado exitosamente' }
  } catch (error) {
    throw new Error('Error eliminando usuario. Inténtalo de nuevo más tarde.')
  }
}
  
  export default deleteUserById