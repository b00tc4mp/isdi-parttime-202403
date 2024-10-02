const createNewUser = async (username, password, access, token) => {
    try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username, access, password }),
    })

    // const text = await response.text()
    // console.log('Raw Response:', text)

    // const result = JSON.parse(text)
    
    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.message || 'Error al registrar usuario')
    }

    return result
} catch (error) {
  console.error('Error al registrar el usuario:', error.message)
  throw new Error('Error al registrar el usuario: ' + error.message)
}
}
export default createNewUser