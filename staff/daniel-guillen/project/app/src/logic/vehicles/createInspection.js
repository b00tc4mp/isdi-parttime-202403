import { SystemError } from "../../../../com/errors"

const createInspection = async (newInspection, token) => {
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}vehicles/createInspection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newInspection),
    })

    const result = await apiResponse.json()

    if (!apiResponse.ok) {
      throw new SystemError(result.message || 'Error al crear inspección')
    }
    return result
  } catch (err) {
    throw new SystemError(err.message || 'Error inesperado en el servidor')
  }
}

export default createInspection