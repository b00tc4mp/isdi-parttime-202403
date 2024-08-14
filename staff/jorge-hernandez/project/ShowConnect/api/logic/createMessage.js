import { Message } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const createMessage = (createdUser, messageText, createdChat) => {
  const newMessage = new Message({
    sender: createdUser._id,
    text: messageText,
    chatId: createdChat._id, // TODO if is necessary to send chat id
  })

  return newMessage.save().catch((error) => {
    throw new SystemError(error.message)
  })
}
export default createMessage
