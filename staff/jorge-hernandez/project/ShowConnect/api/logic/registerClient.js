import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import bcrypt from 'bcryptjs'
import createChat from './createChat.js'
import createMessage from './createMessage.js'
import updateChatWithMessage from './updateChatWithMessage.js'
import validate from 'com/validate.js'

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
  validate.text(messageText)
  validate.password(password)
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

// import { User } from '../data/index.js'
// import { DuplicityError, SystemError } from 'com/errors.js'
// import bcrypt from 'bcryptjs'
// import createChat from './createChat.js'
// import createMessage from './createMessage.js'
// import updateChatWithMessage from './updateChatWithMessage.js'
// import validate from 'com/validate.js'
// import Chat from '../data/chatModel.js' // Asegúrate de que el modelo Chat esté importado

// const registerClient = (
//   name,
//   email,
//   messageText,
//   password,
//   passwordRepeat,
//   artistId
// ) => {
//   validate.name(name)
//   validate.email(email)
//   validate.text(messageText)
//   validate.password(password)
//   validate.id(artistId)

//   return User.findOne({ email })
//     .catch((error) => {
//       throw new SystemError(error.message)
//     })
//     .then((user) => {
//       if (user) {
//         // Revisar si ya existe un chat entre el usuario y el artista
//         return Chat.findOne({ userId: user._id, artistId }).then((existingChat) => {
//           if (existingChat) {
//             // Si el chat ya existe, solo se agrega el mensaje
//             return createMessage(
//               user._id,
//               messageText,
//               existingChat._id
//             ).then((createdMessage) => {
//               return updateChatWithMessage(existingChat._id, createdMessage._id)
//             })
//           }
//           // Si no existe chat, se crea uno nuevo
//           return createChat(user._id, artistId).then((createdChat) => {
//             return createMessage(
//               user._id,
//               messageText,
//               createdChat._id
//             ).then((createdMessage) => {
//               return updateChatWithMessage(createdChat._id, createdMessage._id)
//             })
//           })
//         })
//       }

//       // Si el usuario no existe, se crea el nuevo usuario
//       return bcrypt.hash(password, 8).then((hash) => {
//         const newUser = new User({
//           name,
//           email,
//           password: hash,
//           role: 'client',
//         })

//         return newUser.save().then((createdUser) => {
//           return createChat(createdUser._id, artistId).then((createdChat) => {
//             return createMessage(
//               createdUser._id,
//               messageText,
//               createdChat._id
//             ).then((createdMessage) => {
//               return updateChatWithMessage(createdChat._id, createdMessage._id)
//             })
//           })
//         })
//       })
//     })
//     .catch((error) => {
//       throw new SystemError(error.message)
//     })
// }

// export default registerClient
