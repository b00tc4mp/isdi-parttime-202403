const fetchReferencesLoad = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllReference`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (!response.ok) {
        throw new Error('Error al obtener las referencias')
      }
  
      const result = await response.json()
  
      // Formatear los datos para select reference
      return result.map((reference) => ({
        value: reference, // valor que se enviará a la API
        label: `${reference}`, // texto que se muestra en el select
      }))
    } catch (error) {
      console.error('Error al obtener las referencias:', error)
      return [] // devolvemos un array vacío en caso de error
    }
  }
  
  export default fetchReferencesLoad
  