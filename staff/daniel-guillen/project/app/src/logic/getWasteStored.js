const fetchStoredWaste = async (token, setData, setLoading, setError) => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getWasteStoredToday`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
  
      if (!response.ok) {
        throw new Error('Error al obtener los residuos almacenados')
      }
  
      const result = await response.json()
      setData(result)
      console.log('Datos recibidos del servidor:', result)
    } catch (error) {
      setError(error.message)
      console.error('Error al obtener los residuos almacenados:', error)
    } finally {
      setLoading(false)
    }
  }
  
  export default fetchStoredWaste  