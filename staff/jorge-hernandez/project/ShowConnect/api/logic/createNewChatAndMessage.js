import { DuplicityError, SystemError } from 'com/errors.js'
import createChat from './createChat.js'
import createMessage from './createMessage.js'
import updateChatWithMessage from './updateChatWithMessage.js'
import validate from 'com/validate.js'

const createNewChatAndMessage = (userId, targetUserId)

return createChat(userId, targetUserId).then((createdChat) => {
  return createMessage(userId, messageText, createdChat._id).then(
    (createdMessage) => {
      return updateChatWithMessage(createdChat._id, createdMessage._id)
    }
  )
})

export default createNewChatAndMessage
