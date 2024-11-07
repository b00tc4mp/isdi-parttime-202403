import errors, { SystemError } from 'com/errors'
import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getArtistData = async () => {
  try {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      }
    )

    if (response.status === 200) {
      try {
        return await response.json()
      } catch {
        throw new SystemError('server error')
      }
    }

    try {
      const body = await response.json()
    } catch {
      throw new SystemError('server error')
    }
    const { error, message } = body
    const constructor = errors[error]
    throw new constructor(message)
  } catch {
    throw new SystemError('server error')
  }
}

export default getArtistData
