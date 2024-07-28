import { User } from "../model/index.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"
import { SystemError, CredentialsError, NotFoundError } from "com/errors.js"

const authenticateUser = (username, password) => {
  validate.username(username)
  validate.password(password)

  return User.findOne({ username }).lean()
    .catch(() => { throw new SystemError("connection error") })
    .then(userFound => {
      if (!userFound) {
        throw new NotFoundError("User not found")
      }

      return bcrypt.compare(password, userFound.password)
        .catch(error => console.error(error))
        .then((match) => {
          if (!match) {
            throw new CredentialsError("Wrong Password")
          }

          return userFound._id.toString()
        })
    })
}

export default authenticateUser
