import { Chat } from '../data/index.js'

const updateChatWithMessage = (chatId, messageId) => {
  return Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: messageId } },
    { new: true }
  )
    .then((updatedChat) => {
      if (!updatedChat) {
        throw new SystemError('Chat update failed')
      }
      return { success: true, chat: updatedChat }
    })
    .catch((error) => {
      console.error('Error updating chat with message:', error.message)
      throw new SystemError(
        'Failed to update chat with message: ' + error.message
      )
    })
}
export default updateChatWithMessage
