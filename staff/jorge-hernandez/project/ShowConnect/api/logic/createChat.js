import validate from 'com/validate.js'
import { Chat } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const createChat = async (userId, artistId) => {
  validate.id(userId, 'userId')
  validate.id(artistId, 'artistId')

  const newChat = new Chat({
    participants: [userId, artistId],
    date: new Date(),
  })
  try {
    const newChatSaved = await newChat.save()

    return newChatSaved
  } catch (error) {
    console.error(error.message)
    throw new SystemError(error.message)
  }
}

export default createChat
