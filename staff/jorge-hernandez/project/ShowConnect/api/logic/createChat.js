import { Chat } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const createChat = (userId, artistId) => {
  const newChat = new Chat({
    participants: [userId, artistId],
    date: new Date(),
  })

  return newChat.save().catch((error) => {
    console.error('Error creating chat:', error.message)
    throw new SystemError('Failed to create chat: ' + error.message)
  })
}

export default createChat
