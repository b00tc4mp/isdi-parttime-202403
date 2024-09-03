const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        if (response.status === 200) {
            const data = await response.json()
            sessionStorage.setItem('token', data.token)
            return data
        } else {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Error al iniciar sesión')
        }
    } catch (error) {
        console.error('Error en el servidor :(', error)
        throw new Error('Error en el servidor :(')
    }
}

export default loginUser
