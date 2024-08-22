import { Chat } from '../data/index.js'
import { SystemError, CredentialsError } from 'com/errors.js'

const findExistingChat = (userId, artistId) => {
  return Chat.findOne({
    participants: { $all: [userId, artistId] },
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((chat) => {
      if (!chat) throw new CredentialsError('Chat not found')
      return chat
    })
}

export default findExistingChat
