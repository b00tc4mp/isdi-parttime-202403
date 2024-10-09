const deleteInspectionById = async (inspectionId, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/deleteInspection/${inspectionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Error al eliminar la inspección')
    }

    return { message: 'Inspección eliminada exitosamente' }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default deleteInspectionById