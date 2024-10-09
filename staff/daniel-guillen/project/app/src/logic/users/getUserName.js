const fetchUserName = async (token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users/getUserName`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al obtener username')
    }

    const data = await response.json()
    return data.username // Devolvemos el nombre de usuario
  } catch (err) {
    console.error('Error al obtener el nombre de usuario:', err)
    throw new Error('Error en la solicitud')
  }
}

export default fetchUserName