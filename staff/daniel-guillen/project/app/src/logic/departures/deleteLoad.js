const deleteLoadById = async (id, token) => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}departures/deleteLoad/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
  
      if (!apiResponse.ok) {
        throw new Error('Error al eliminar carga')
      }
  
      return { message: 'Carga eliminada exitosamente' }
    } catch (error) {
      throw new Error('Error al eliminar carga. Inténtalo de nuevo más tarde.')
    }
  }
  
  export default deleteLoadById