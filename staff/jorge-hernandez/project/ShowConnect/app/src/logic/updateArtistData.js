// logic/updateArtistData.js
import { SystemError } from 'com/errors'

const updateArtistData = (artistId, updatedData) => {
  return fetch(`http://localhost:8080/users/${artistId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        return response.json().then((body) => {
          const { error, message } = body
          throw new SystemError(message)
        })
      }
    })
    .catch((error) => {
      throw new SystemError('server error')
    })
}

export default updateArtistData
