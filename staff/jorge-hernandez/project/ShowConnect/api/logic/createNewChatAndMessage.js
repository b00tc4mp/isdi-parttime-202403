import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import logic from './index.js'

const createNewChatAndMessage = (userId, artistId, messageText) => {
  return logic
    .findExistingChat(userId, artistId)
    .then((existingChat) => {
      if (existingChat) {
        return logic
          .createMessage(userId, messageText, existingChat._id)
          .then((createdMessage) => {
            return logic
              .updateChatWithMessage(existingChat._id, createdMessage._id)
              .then(() => {
                return {
                  chatId: existingChat._id,
                  messageId: createdMessage._id,
                }
              })
          })
      } else {
        return logic.createChat(userId, artistId).then((createdChat) => {
          return logic
            .createMessage(userId, messageText, createdChat._id)
            .then((createdMessage) => {
              return logic
                .updateChatWithMessage(createdChat._id, createdMessage._id)
                .then(() => {
                  return {
                    chatId: createdChat._id,
                    messageId: createdMessage._id,
                    //TODO REVIEW IF IS NECESSARY RETURN
                  }
                })
            })
        })
      }
    })
    .catch((error) => {
      console.error(error.message)
      if (error instanceof DuplicityError) {
        throw new DuplicityError('Chat already exist')
      } else {
        throw new SystemError('Server error')
      }
    })
}

export default createNewChatAndMessage
