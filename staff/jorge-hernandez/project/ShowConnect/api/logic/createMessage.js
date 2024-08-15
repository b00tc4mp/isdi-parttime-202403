import { Message } from '../data/index.js'
import { Chat } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const createMessage = (userId, messageText, chatId) => {
  const newMessage = new Message({
    sender: userId,
    text: messageText,
    chatId: chatId,
  })

  return newMessage.save().catch((error) => {
    console.error('Error creating message:', error.message)
    throw new SystemError('Failed to create message: ' + error.message)
  })
}

export default createMessage
