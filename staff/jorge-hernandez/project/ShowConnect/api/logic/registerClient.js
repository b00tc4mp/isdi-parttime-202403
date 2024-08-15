import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import bcrypt from 'bcryptjs'
import createChat from './createChat.js'
import createMessage from './createMessage.js'
import updateChatWithMessage from './updateChatWithMessage.js'

const registerClient = (
  name,
  email,
  messageText,
  password,
  passwordRepeat,
  artistId
) => {
  return User.findOne({ email })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (user) {
        throw new DuplicityError('User already exists')
      }

      return bcrypt.hash(password, 8)
    })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((hash) => {
      const newUser = new User({
        name,
        email,
        password: hash,
        role: 'client',
      })

      return newUser.save()
    })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((createdUser) => {
      return createChat(createdUser._id, artistId).then((createdChat) => {
        return createMessage(
          createdUser._id,
          messageText,
          createdChat._id
        ).then((createdMessage) => {
          return updateChatWithMessage(createdChat._id, createdMessage._id)
        })
      })
    })
}

export default registerClient
