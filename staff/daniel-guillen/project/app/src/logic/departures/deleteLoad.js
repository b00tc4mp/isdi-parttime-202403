import { SystemError } from "../../../../com/errors"

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
      const errorResponse = await apiResponse.json()
      throw new SystemError(errorResponse.message || 'Error al eliminar carga')
    }

    return { message: 'Carga eliminada exitosamente' }
  } catch (err) {
    throw new SystemError(err.message || 'Error inesperado en el servidor')
  }
}

export default deleteLoadById