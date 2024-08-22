import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createAndUpdateMessage = (chatId, userId, messageText) => {
  validate.id(chatId)
  validate.id(userId)
  validate.text(messageText)

  return fetch(`http://localhost:8080/messages`, {
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
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.status === 200) return

      return response
        .json()
        .catch(() => {
          throw new SystemError('server error')
        })
        .then((body) => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default createAndUpdateMessage
