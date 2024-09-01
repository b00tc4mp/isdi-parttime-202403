import validate from 'com/validate.js'
import { Message } from '../data/index.js'

import { SystemError, ContentError } from 'com/errors.js'

const createMessage = async (userId, messageText, chatId) => {
  try {
    validate.id(userId, 'userId')
    validate.text(messageText, 'messageText')
    validate.id(chatId, 'chatId')
  } catch (error) {
    throw new ContentError(error.message)
  }

  const newMessage = new Message({
    sender: userId,
    text: messageText,
    chatId: chatId,
  })

  try {
    await newMessage.save()
  } catch (error) {
    console.error(error.message)
    throw new SystemError(error.message)
  }
}

export default createMessage
