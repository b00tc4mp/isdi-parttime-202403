import { Chat } from '../data/index.js'

const updateChatWithMessage = (chatId, messageId) => {
  return Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: messageId } },
    { new: true }
  )
    .then((updatedChat) => {
      if (!updatedChat) {
        throw new SystemError(error.message)
      }
      return { success: true, chat: updatedChat }
    })
    .catch((error) => {
      console.error(error.message)
      throw new SystemError(error.message)
    })
}
export default updateChatWithMessage
