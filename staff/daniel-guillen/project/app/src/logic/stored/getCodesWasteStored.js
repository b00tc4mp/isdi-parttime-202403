import { SystemError } from "../../../../com/errors"

const fetchCodesWasteStored = async (month, year, token) => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}stored/getAllCodesStored/${month}/${year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
  
      const result = await apiResponse.json()
  
      if (!apiResponse.ok) {
        throw new SystemError(result.message || 'Error al obtener lista de códigos')
      }
      return result
    } catch (err) {
      throw new SystemError(err.message || 'Error al obtener lista de códigos')
    }
  }
  
  export default fetchCodesWasteStored