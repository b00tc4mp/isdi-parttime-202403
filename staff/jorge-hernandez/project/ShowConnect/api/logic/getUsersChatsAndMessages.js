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
      return chats.map((chat) => ({
        id: chat._id,
        participants: chat.participants.map((participant) => ({
          id: participant._id,
          name: participant.name,
          email: participant.email,
          artisticName: participant.artisticName,
          role: participant.role,
        })),
        messages: chat.messages.map((message) => ({
          id: message._id,
          text: message.text,
          date: message.date,
          sender: {
            id: message.sender._id,
            name: message.sender.name,
            email: message.sender.email,
            artisticName: message.sender.artisticName,
            role: message.sender.role,
          },
        })),
      }))
    })
}

export default getUserChatsAndMessages
