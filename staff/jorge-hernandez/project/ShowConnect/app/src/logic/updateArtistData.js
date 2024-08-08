import { SystemError } from 'com/errors'

const updateArtistData = (userId, updatedData) => {
  return fetch(`http://localhost:8080/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return response.json().then((body) => {
        const { error, message } = body
        throw new SystemError(message)
      })
    })
    .catch((error) => {
      throw new SystemError('server error')
    })
}

export default updateArtistData
