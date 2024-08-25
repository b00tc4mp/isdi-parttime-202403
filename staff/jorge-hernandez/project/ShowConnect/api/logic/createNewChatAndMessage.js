import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import logic from './index.js'

const createNewChatAndMessage = (userId, artistId, messageText) => {
  validate.id(userId, 'userId')
  validate.id(artistId, 'artistId')
  validate.text(messageText, 'messageText')

  return logic
    .findExistingChat(userId, artistId)
    .then((existingChat) => {
      if (existingChat) {
        return logic.createAndUpdateMessage(
          existingChat._id,
          userId,
          messageText
        )
      }

      return logic.createChat(userId, artistId).then((createdChat) => {
        return logic
          .createMessage(userId, messageText, createdChat._id)
          .then((createdMessage) => {
            return logic.updateChatWithMessage(
              createdChat._id,
              createdMessage._id
            )
          })
      })
    })
    .catch((error) => {
      console.error('Error:', error.message)
      if (error instanceof DuplicityError) {
        throw new DuplicityError('Chat already exists')
      } else {
        throw new SystemError('Server error')
      }
    })
}

export default createNewChatAndMessage
