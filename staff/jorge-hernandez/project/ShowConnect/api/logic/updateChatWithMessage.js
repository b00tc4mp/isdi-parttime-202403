import { Chat } from '../data/index.js'

const updateChatWithMessage = (chatId, messageId) => {
  return Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: messageId } },
    { new: true }
  ).catch((error) => {
    throw new SystemError(error.message)
  })
}
export default updateChatWithMessage
