import { Chat } from '../data/index.js'
import validate from 'com/validate.js'
import { SystemError } from 'com/errors.js'

const updateChatWithMessage = (chatId, messageId) => {
  validate.id(chatId)
  validate.id(messageId)

  return Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: messageId } },
    { new: true }
  )
    .then((updatedChat) => {
      if (!updatedChat) {
        throw new SystemError('Chat not found')
      }
      return { success: true, chat: updatedChat }
    })
    .catch((error) => {
      throw new SystemError(error.message)
    })
}

export default updateChatWithMessage
