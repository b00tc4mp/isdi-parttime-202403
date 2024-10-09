const fetchLoads = async (selectedReference, token, setData, setLoading, setError) => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllLoads/${selectedReference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
  
      if (!response.ok) {
        throw new Error('Error al obtener las cargas almacenadas')
      }
  
      const result = await response.json()
      setData(result)
      console.log(result)
    } catch (error) {
      setError(error.message)
      console.error('Error al obtener las cargas almacenadas:', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }
  
  export default fetchLoads