import { SystemError, ContentError } from 'com/errors.js'
import { Chat } from '../data/index.js'

const createChat = (userId, message) => {
  if (!userId || !message) {
    return Promise.reject(new ContentError('userId y message required'))
  }

  const newChat = {
    users: userId,
    messages: message,
    date: Date.now(),
  }

  return Chat.create(newChat)
    .then((chat) => chat)
    .catch((error) => {
      throw new SystemError(error.message)
    })
}

export default createChat
