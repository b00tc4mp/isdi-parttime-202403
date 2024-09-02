import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createAndUpdateMessage = async (chatId, userId, messageText) => {
  validate.id(chatId)
  validate.id(userId)
  validate.text(messageText)

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.token}`,
      },
      body: JSON.stringify({
        chatId,
        userId,
        messageText,
      }),
    })

    if (response.status === 200) {
      return
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
    if (!(error instanceof SystemError)) {
      console.error(error.message)
      throw new SystemError('server error')
    }
    throw error
  }
}

export default createAndUpdateMessage
