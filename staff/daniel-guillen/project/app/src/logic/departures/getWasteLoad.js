const fetchLoadWaste = async (week, year, reference, token, setData, setLoading, setError) => {
  try {
    setLoading(true)
    setError(null)

    const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllLoads/${week}/${year}/${reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        // no hay datos, porque es una referencia nueva
        setData([])
        return
      }
      throw new Error('Error al obtener las cargas almacenadas')
    }

    const result = await response.json()
    
    if (result.length === 0) {
      setData([])
    } else {
      setData(result)  // renderizamos los datos si se encontraron
    }

  } catch (error) {
    setError('Hubo un problema al conectar con el servidor')
  } finally {
    setLoading(false)
  }
}

export default fetchLoadWaste