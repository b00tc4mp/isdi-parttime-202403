import { Chat } from '../data/index.js'
import validate from 'com/validate.js'
import { SystemError } from 'com/errors.js'

const updateChatWithMessage = async (chatId, messageId) => {
  validate.id(chatId)
  validate.id(messageId)

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: messageId } },
      { new: true }
    )
    if (!updatedChat) {
      throw new SystemError('Chat not found')
    }
    return { success: true, chat: updatedChat }
  } catch (error) {
    throw new SystemError(error.message)
  }
}

export default updateChatWithMessage
