const fetchCodesWasteStored = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getAllCodesStored`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      if (!response.ok) {
        throw new Error('Error al obtener lista de códigos')
      }
  
      const result = await response.json()
  
      // Formatear los datos para react-select
      return result.map((item) => ({
        value: item.code,
        label: `${item.code} - ${item.description}`
      }))
    } catch (error) {
      console.error('Error al obtener lista de códigos', error)
      return [] // devolver un array vacio en caso de error
    }
  }
  
  export default fetchCodesWasteStored
  