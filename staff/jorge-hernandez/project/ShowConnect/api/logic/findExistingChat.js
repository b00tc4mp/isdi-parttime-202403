import validate from 'com/validate.js'
import { Chat } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const findExistingChat = (userId, artistId) => {
  validate.id(userId, 'user id')
  validate.id(artistId, 'artist id')

  return Chat.findOne({
    participants: { $all: [userId, artistId] },
  }).catch((error) => {
    throw new SystemError(error.message)
  })
}

export default findExistingChat
