const fetchStoredWaste = async (token, setData, setLoading, setError) => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getAllWasteStored`, {
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
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  export default fetchStoredWaste  