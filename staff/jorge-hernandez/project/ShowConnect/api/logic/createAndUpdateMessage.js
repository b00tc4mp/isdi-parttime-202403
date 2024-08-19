import { SystemError } from 'com/errors.js'
import logic from '../logic/index.js'
import validate from 'com/validate.js'

const createAndUpdateMessage = (chatId, userId, messageText) => {
  validate.id(chatId)
  validate.id(userId)
  validate.text(messageText)

  return logic
    .createMessage(userId, messageText, chatId)
    .then((message) => {
      return logic.updateChatWithMessage(chatId, message._id)
    })
    .catch((error) => {
      console.error(error.message)
      throw new SystemError(error.message)
    })
}

export default createAndUpdateMessage
