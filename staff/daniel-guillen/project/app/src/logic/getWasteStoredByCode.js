const fetchStoredWaste = async (selectedWaste, token, setData, setLoading, setError, month, year) => {
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
      console.error('Error al obtener lista de códigos:', error)
    } finally {
        setTimeout(() => {
           setLoading(false) 
        }, 700)
      
    }
  }
  
  export default fetchStoredWaste