import { SystemError } from "../../../../com/errors"

const fetchInspectionsById = async (id, token) => {
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getInspectionById/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    const result = await apiResponse.json()

    if (!apiResponse.ok) {
      throw new SystemError(result.message || 'Error al obtener inspecciones almacenadas')
    }

    return result
  } catch (err) {
    throw new SystemError(err.message || 'Error inesperado al obtener inspecciones almacenadas')
}
}

export default fetchInspectionsById