  // obtener el mes y año actual
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

const fetchStoredWaste = async (selectedWaste, token, setData, setLoading, setError ) => {
    try {
    setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getWasteStored/${month}/${year}/${selectedWaste}`, {
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
      console.error('Error al obtener los residuos almacenados:', error)
    } finally {
           setLoading(false)    
    }
  }
  
  export default fetchStoredWaste