import { SystemError } from "../../../../com/errors"

const createWaste = async (dataWaste, token) => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}stored/createWaste`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataWaste),
      })
  
      const result = await apiResponse.json()
  
    if (!apiResponse.ok) {
      throw new SystemError(result.message || 'Error al crear residuo')
    }
    return result
  } catch (err) {
    throw new SystemError(err.message || 'Error inesperado en el servidor')
  }
}
  
  export default createWaste