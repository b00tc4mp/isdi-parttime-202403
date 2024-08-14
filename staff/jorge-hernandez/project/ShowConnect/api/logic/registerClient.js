import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
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
  validate.name(name)
  validate.email(email)
  validate.text(messageText, 'MessageText')
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)
  validate.id(artistId)

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
      return createChat(createdUser, artistId).then((createdChat) => {
        return createMessage(createdUser, messageText, createdChat).then(
          (createdMessage) => {
            return updateChatWithMessage(createdChat._id, createdMessage._id)
          }
        )
      })
    })
}

export default registerClient
