const createLoad = async (dataLoad, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}departures/createLoad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dataLoad),
    })
  
    const result = await response.json()
  
    if (!response.ok) {
        throw new Error(result.message || 'Error al registrar el residuo')
      }
  
      return result
    } catch (error) {
      throw new Error('Error al registrar el residuo: ' + error.message)
    }
  }
  
  export default createLoad