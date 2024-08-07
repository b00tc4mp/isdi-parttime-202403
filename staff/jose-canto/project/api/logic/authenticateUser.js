import validate from "com/validate.js"
import { User } from "../model/index.js"
import bcrypt from "bcryptjs"
import { SystemError, CredentialsError, NotFoundError } from "com/errors.js"


const authenticateUser = (username, password) => {
  validate.username(username, "Username")
  validate.password(password)

  return User.findOne({ username }).lean()
    .catch((error) => { throw new SystemError(error.message) })
    .then(userFound => {
      if (!userFound) {
        throw new CredentialsError("User not found")
      }

      return bcrypt.compare(password, userFound.password)
        .catch(error => { throw new SystemError(error.message) })
        .then((match) => {
          if (!match) {
            throw new CredentialsError("Wrong password")
          }

          return userFound._id.toString()
        })
    })
}

export default authenticateUser
