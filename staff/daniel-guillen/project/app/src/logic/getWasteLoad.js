const fetchLoadWaste = async (week, year, reference, token, setData, setLoading, setError) => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllLoads/${week}/${year}/${reference}`, {
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
      setLoading(false)
    }
  }
  
  export default fetchLoadWaste