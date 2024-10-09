const getAllVehicles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getAllVehicles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (!response.ok) {
        throw new Error('Error al obtener lista de vehículos')
      }
  
      const result = await response.json()
  
      // Formatear los datos para react-select
      return result.map((item) => ({
        value: {
          id: item.id,
          model: item.model,
          size: item.size
        },
        label: `${item.model} - ${item.id}`
      }))
    } catch (error) {
      console.error('Error al obtener lista de vehículos', error)
      throw error
    }
  }

  export default getAllVehicles
  