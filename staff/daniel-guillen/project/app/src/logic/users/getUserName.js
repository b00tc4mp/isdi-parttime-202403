import { SystemError, NotFoundError } from "../../../../com/errors"

const fetchUserName = async (token) => {
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}users/getUserName`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await apiResponse.json()

    if (!apiResponse.ok) { // Primero si la respuesta no fue exitosa con servidor
      throw new NotFoundError(data.message || 'Error al obtener datos de usuario')
    }

    return data.username // Devolvemos datos de usuario, de momento solo nombre de usuario(Prox. access)
  } catch (err) {
    throw new SystemError(err.message || 'Error inesperado en el servidor')
  }
}

export default fetchUserName