import { SystemError } from "../../../../com/errors"

const fetchLoadWaste = async (week, year, reference, token, setData, setLoading, setError) => {
  try {
      setLoading(true)

      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllLoads/${week}/${year}/${reference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      const result = await apiResponse.json()

      if (!apiResponse.ok) {
        throw new SystemError(result.message || 'Error al obtener las cargas almacenadas')
      }

    setData(result)
    } catch (err) {
    setError(err.message || 'Error inesperado al obtener las cargas almacenadas')
    } finally {
    setLoading(false)
    }
}

export default fetchLoadWaste