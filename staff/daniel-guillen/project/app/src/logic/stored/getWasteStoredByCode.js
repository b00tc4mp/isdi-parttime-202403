import { SystemError } from "../../../../com/errors"

const fetchStoredWaste = async (selectedWaste, month, year, token, setData, setLoading, setError ) => {
    try {
    setLoading(true)

      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}stored/getWasteStored/${month}/${year}/${selectedWaste}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
  
    const result = await apiResponse.json()

    if (!apiResponse.ok) {
      throw new SystemError(result.message || 'Error al obtener los residuos almacenados')
    }

    setData(result)
  } catch (err) {
    setError(err.message || 'Error inesperado al obtener los residuos almacenados')
  } finally {
    setLoading(false)
  }
}
  
  export default fetchStoredWaste