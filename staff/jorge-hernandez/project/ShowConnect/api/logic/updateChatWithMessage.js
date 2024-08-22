import { Chat } from '../data/index.js'
import validate from 'com/validate.js'

const updateChatWithMessage = (chatId, messageId) => {
  validate.id(chatId)
  validate.id(messageId)

  return Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: messageId } },
    { new: true }
  )
    .catch((error) => {
      throw new SystemError(error.message)
    })

    .then((updatedChat) => {
      if (!updatedChat) {
        throw new SystemError(error.message)
      }
      return { success: true, chat: updatedChat }
    })
}
export default updateChatWithMessage
