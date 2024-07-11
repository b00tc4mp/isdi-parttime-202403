import { User } from "../data/index.js"
import { CredentialsError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"

const authenticateUser = (username, password) => {
  validate.username(username)
  validate.password(password)

  return User.findOne({ username }).lean()
    .catch((error) => { throw new SystemError(error.message) })
    .then(userFound => {
      if (!userFound) {
        throw new CredentialsError("❌ User not found ❌")
      }

      console.log(`User found: ${userFound.username}`)
      console.log(`Password hash: ${userFound.password}`)

      return bcrypt.compare(password, userFound.password)
        .catch((error) => { console.error(error) })
        .then((match) => {
          if (!match) {
            throw new CredentialsError("❌ Wrong password ❌")
          }
          console.log(`Password match: ${match}`)
          return userFound._id.toString()
        })

    })
}
export default authenticateUser
