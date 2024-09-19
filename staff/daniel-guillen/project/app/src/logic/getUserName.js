const getUserName = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}users/getUserName`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Envía el token
          'Content-Type': 'application/json',
        },
      })
  
      if (!response.ok) throw new Error('Error al obtener username')
  
      const data = await response.json()
      return data.username
    } catch (error) {
      console.error('Error al obtener el nombre de usuario:', error)
      throw error
    }
  }
  
  export default getUserName