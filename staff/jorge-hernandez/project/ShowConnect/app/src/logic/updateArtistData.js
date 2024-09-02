import { SystemError } from 'com/errors'
import validate from 'com/validate'

const updateArtistData = (userId, updatedData) => {
  validate.id(userId)

  if (updatedData.artisticName) {
    validate.name(updatedData.artisticName, 'artisticName')
  }

  if (updatedData.description) {
    validate.text(updatedData.description, 'description')
  }

  if (updatedData.image) {
    validate.url(updatedData.image, 'image')
  }

  if (updatedData.video) {
    validate.url(updatedData.video, 'video')
  }

  return fetch(`${import.meta.env.VITE_API_URL}users/${userId}`, {
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
        throw new SystemError('server error')
      })
    })
    .catch((error) => {
      throw new SystemError('server error')
    })
}

export default updateArtistData
