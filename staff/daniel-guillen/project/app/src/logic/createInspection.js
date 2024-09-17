const createInspection = async (newInspection, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/createInspection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newInspection),
      })
  
      const result = await response.json()
  
      if (!response.ok) {
        throw new Error(result.message || 'Error al registrar inspección')
      }
  
      return result
    } catch (error) {
      console.error('Error al registrar inspección', error.message)
      throw error
    }
  }

  export default createInspection
  