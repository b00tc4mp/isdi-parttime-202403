import { User } from "../data/index.js";
import validate from "com/validate.js";
import { CredentialsError, SystemError } from "com/errors.js";
import bcrypt from 'bcryptjs'

const authenticateUser = (email, password) => {

  validate.email(email)
  validate.password(password)

  return User.findOne({ email })
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new CredentialsError('user not found')
      }
      return bcrypt.compare(password, user.password)
        .catch(error => { throw new SystemError(error.message) })
        .then(match => {
          if (!match) {
            throw new CredentialsError('wrong password')
          }
            return user._id.toString()
        })
    })
}

export default authenticateUser