import { SystemError } from 'com/errors.js'
import Chat from '../data/Chat.js'
import Message from '../data/Message.js'
import User from '../data/User.js'
import validate from 'com/validate.js'

function getUserChatsAndMessages(userId) {
  validate.id(userId)

  return Chat.find({ participants: userId })
    .populate({
      path: 'messages',
      populate: {
        path: 'sender',
        select: 'name email artisticName role',
      },
      select: 'text date',
    })
    .populate({
      path: 'participants',
      select: 'name email artisticName role',
    })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((chats) => {
      return chats
    })
}

export default getUserChatsAndMessages
