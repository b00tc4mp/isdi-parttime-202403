import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerClient = (name, email, password, passwordRepeat) => {
  validate.name(name)
  validate.email(email)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return User.findOne({ email })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (user) {
        throw new DuplicityError('User already exists')
      }

      return bcrypt
        .hash(password, 8)
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then((hash) => {
          const newUser = {
            name: name,
            email: email,
            password: hash,
            role: 'client',
          }

          return User.create(newUser)
            .catch((error) => {
              throw new SystemError(error.message)
            })
            .then(() => {})
        })
    })
}

export default registerClient
