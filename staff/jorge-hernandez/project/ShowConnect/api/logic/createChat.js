import { SystemError } from 'com/errors.js'
import { Chat } from '../data/index.js'

const createChat = (createdUser, artistId) => {
  const newChat = new Chat({
    participants: [createdUser._id, artistId],
    messages: [],
  })

  return newChat.save().catch((error) => {
    throw new SystemError(error.message)
  })
}
export default createChat
