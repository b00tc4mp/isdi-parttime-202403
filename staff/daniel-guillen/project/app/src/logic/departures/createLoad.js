import { SystemError } from "../../../../com/errors"

const createLoad = async (dataLoad, token) => {
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}departures/createLoad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dataLoad),
    })
  
    const result = await apiResponse.json()
  
    if (!apiResponse.ok) {
      throw new SystemError(result.message || 'Error al crear carga')
    }
    return result
  } catch (err) {
    throw new SystemError(err.message || 'Error inesperado en el servidor')
  }
}
  
  export default createLoad