import { SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Chat, Message } from '../data/index.js'

const createNewChatAndMessage = async (userId, artistId, messageText) => {
  validate.id(userId, 'userId')
  validate.id(artistId, 'artistId')
  validate.text(messageText, 'messageText')

  try {
    const existingChat = await Chat.findOne({
      participants: { $all: [userId, artistId] },
    })

    if (existingChat) {
      try {
        const newMessage = new Message({
          sender: userId,
          text: messageText,
          chatId: existingChat._id,
        })

        await newMessage.save()

        await Chat.findByIdAndUpdate(existingChat._id, {
          $push: { messages: newMessage._id },
        })
      } catch (error) {
        console.error(error.message)
        throw new SystemError(error.message)
      }
    } else {
      try {
        const newChat = new Chat({
          participants: [userId, artistId],
          date: new Date(),
        })

        const savedChat = await newChat.save()

        const newMessage = new Message({
          sender: userId,
          text: messageText,
          chatId: savedChat._id,
        })

        await newMessage.save()

        await Chat.findByIdAndUpdate(savedChat._id, {
          $push: { messages: newMessage._id },
        })
      } catch (error) {
        console.error(error.message)
        throw new SystemError(error.message)
      }
    }
  } catch (error) {
    console.error(error.message)
    throw new SystemError(error.message)
  }
}

export default createNewChatAndMessage
