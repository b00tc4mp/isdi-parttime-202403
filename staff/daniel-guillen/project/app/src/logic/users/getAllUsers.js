const fetchAllUsers = async (token, setData, setLoading, setError) => {
        try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/getAllUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Error al obtener lista de Usuarios')
        }

        const result = await response.json()
        setData(result)
        console.log('Usuarios recibidos del servidor:', result)
    } catch (error) {
        setError(error.message)
        console.error('Error al obtener los usuarios registrados:', error)
    } finally {
        setLoading(false)
    }
}

export default fetchAllUsers