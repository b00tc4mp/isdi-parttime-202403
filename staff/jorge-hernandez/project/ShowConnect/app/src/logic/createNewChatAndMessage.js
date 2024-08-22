import validate from 'com/validate'

const createNewChatAndMessage = (userId, artistId, messageText) => {
  validate.id(userId, 'userId')
  validate.id(artistId, 'artistId')
  validate.text(messageText, 'messageText')

  return fetch(`http://localhost:8080/messages/create`, {
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
export default createNewChatAndMessage
