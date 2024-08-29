import validate from 'com/validate.js'
import { Chat } from '../data/index.js'
import { Message } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const createAndUpdateMessage = (chatId, userId, messageText) => {
  validate.id(chatId, 'chatId')
  validate.id(userId, 'userId')
  validate.text(messageText, 'messageText')

  const newMessage = new Message({
    sender: userId,
    text: messageText,
    chatId: chatId,
  })

  return newMessage
    .save()
    .then((savedMessage) => {
      return Chat.findByIdAndUpdate(
        chatId,
        { $push: { messages: savedMessage._id } },
        { new: true }
      )
    })
    .catch((error) => {
      console.error(error.message)
      throw new SystemError(error.message)
    })
    .then((updatedChat) => {
      if (!updatedChat) {
        throw new SystemError('Chat not found')
      }
      return { success: true, chat: updatedChat }
    })
}

export default createAndUpdateMessage
