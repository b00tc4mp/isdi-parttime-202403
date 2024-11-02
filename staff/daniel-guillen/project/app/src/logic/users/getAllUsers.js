import { CredentialsError } from "../../../../com/errors"

const fetchAllUsers = async (token, setData, setLoading, setError) => {
        try {
        setLoading(true)
        const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}users/getAllUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        const result = await apiResponse.json()

        if (!apiResponse.ok) { // Primero si la respuesta no fue exitosa con servidor
          throw new CredentialsError(result.message || 'Error al obtener usuarios almacenados')
        }
    
        setData(result) // datos si la solicitud fue exitosa
      } catch (error) {
        // Lanzar el error completo y no solo el mensaje
        setError(error.message || 'Error inesperado al obtener usuarios almacenados')
      } finally {
        setLoading(false)
      }
    }

export default fetchAllUsers