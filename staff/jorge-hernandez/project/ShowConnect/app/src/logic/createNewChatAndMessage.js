import { SystemError } from 'com/errors'
import validate from 'com/validate'

const createNewChatAndMessage = async (userId, artistId, messageText) => {
  validate.id(userId, 'userId')
  validate.id(artistId, 'artistId')
  validate.text(messageText, 'messageText')

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}messages/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.token}`,
        },
        body: JSON.stringify({
          userId,
          artistId,
          messageText,
        }),
      }
    )

    if (response.status === 200) return

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
export default createNewChatAndMessage
