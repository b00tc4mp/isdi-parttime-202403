const fetchInspectionsById = async (id, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getInspectionById/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener las inspecciones almacenadas')
    }

    const result = await response.json()
    return result // Retornamos las inspecciones obtenidas
  } catch (error) {
    throw new Error(error.message)
  }
}

export default fetchInspectionsById