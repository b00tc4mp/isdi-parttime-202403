import { SystemError, ValidationError } from "../../../../com/errors"

const loginUser = async (username, password) => {
    try {
        const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        // Manejar respuesta no exitosa
        if (!apiResponse.ok) {
            let errorData
            try {
                errorData = await apiResponse.json()  // Intentar obtener el error del servidor
            } catch (error) {
                errorData = { message: 'Error desconocido' }  // Error genérico si no se puede obtener el error del servidor
            }
            // Lanzar un ValidationError con el mensaje del servidor o un mensaje por defecto
            throw new ValidationError(errorData.message || 'Error al iniciar sesión')
        }

        // Autenticación exitosa
        const data = await apiResponse.json()  // Convertir la respuesta en JSON
        sessionStorage.setItem('token', data.token)  // Guardar el token en sessionStorage
        return data

    } catch (err) {
        if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
            throw new SystemError('No se pudo conectar al servidor. Verifica tu conexión o intenta más tarde.');
          }
        throw new SystemError(err.message || 'Error inesperado en el servidor')
    }
}

export default loginUser