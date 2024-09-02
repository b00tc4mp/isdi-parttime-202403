import validate from 'com/validate.js'
import { Chat } from '../data/index.js'
import { Message } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const createAndUpdateMessage = async (chatId, userId, messageText) => {
  validate.id(chatId, 'chatId')
  validate.id(userId, 'userId')
  validate.text(messageText, 'messageText')

  try {
    const newMessage = new Message({
      sender: userId,
      text: messageText,
      chatId: chatId,
    })
    const savedMessage = await newMessage.save()

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: savedMessage._id } },
      { new: true }
    )

    if (!updatedChat) {
      throw new SystemError('chat not found')
    }

    // return { success: true, chat: updatedChat }
  } catch (error) {
    console.error(error.message)
    throw new SystemError(error.message)
  }
}

export default createAndUpdateMessage
