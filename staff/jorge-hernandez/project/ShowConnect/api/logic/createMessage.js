import validate from 'com/validate.js'
import { Message } from '../data/index.js'

import { SystemError } from 'com/errors.js'
//TODO authenticate user
const createMessage = (userId, messageText, chatId) => {
  validate.id(userId, 'userId')
  validate.text(messageText, 'messageText')
  validate.id(chatId, 'chatId')

  const newMessage = new Message({
    sender: userId,
    text: messageText,
    chatId: chatId,
  })

  return newMessage.save().catch((error) => {
    console.error(error.message)
    throw new SystemError(error.message)
  })
}

export default createMessage
