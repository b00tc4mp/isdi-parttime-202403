const deleteWasteById = async (id, token) => {
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}stored/deleteWaste/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!apiResponse.ok) {
      throw new Error('Error al eliminar el residuo')
    }

    return { message: 'Residuo eliminado exitosamente 🎉' }
  } catch (error) {
    throw new Error('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
  }
}

export default deleteWasteById