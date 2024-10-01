const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        if (!response.ok) { // si no hay exito en la autenticacion
            let errorData
            try {
                errorData = await response.json() // al obtener el string
            } catch (error) {
                errorData = { message: 'Error desconocido' } // error generico
            }
            // lanza el error con el mensaje del servidor(como usuario no existe o contraseña no valida) o uno por defecto
            throw new Error(errorData.message || 'Error al iniciar sesión')
        }

        // autenticacion exitosa
        const data = await response.json()
        sessionStorage.setItem('token', data.token)
        return data

    } catch (error) {
        console.error('Error en el servidor:', error.message) // Muestra el mensaje específico
        throw new Error(error.message || 'Error en el servidor.')
    }
}

export default loginUser