import { SystemError } from 'com/errors'
import validate from 'com/validate'

const updateArtistData = async (userId, updatedData) => {
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

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }
    )

    if (response.status === 200) {
      try {
        return await response.json()
      } catch (jsonError) {
        throw new SystemError(`${response.statusText}`)
      }
    }

    try {
      body = await response.json()
    } catch (jsonError) {
      throw new SystemError(`${response.statusText}`)
    }

    const { error, message } = body

    const constructor = errors[error]

    throw new constructor(message)
  } catch (error) {
    throw new SystemError('Server error')
  }
}

export default updateArtistData
