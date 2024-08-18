import { SystemError } from 'com/errors.js'
import logic from '../logic/index.js'

const createAndUpdateMessage = (chatId, userId, messageText) => {
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
