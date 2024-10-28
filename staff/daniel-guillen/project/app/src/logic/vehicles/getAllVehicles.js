import { SystemError } from "../../../../com/errors"

const getAllVehicles = async () => {
    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getAllVehicles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (!apiResponse.ok) {
        throw new SystemError(result.message || 'Error al obtener lista de vehículos')
      }
  
      const result = await apiResponse.json()
  
      return result.map((item) => ({
        value: {
          id: item.id,
          model: item.model,
          size: item.size
        },
        label: `${item.model} - ${item.id}`
      }))
    } catch (error) {
      console.error('No hay vehiculos')
      return []
    }
  }

  export default getAllVehicles
  