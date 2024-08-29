import data from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"



const authenticateUser = (username, password, callback) => {
  validate.username(username)
  validate.password(password)
  validate.callback(callback)


  data.users.findOne({ username })
    .then(userFound => {

      if (!userFound) {
        callback(new MatchError("❌ User not found ❌"))
        return
      }

      console.log(`User found: ${userFound.username}`)
      console.log(`Password hash: ${userFound.password}`)

      bcrypt.compare(password, userFound.password, (error, match) => {
        if (error) {
          callback(new SystemError(error.message))
          return
        }

        console.log(`Password match: ${match}`)

        if (!match) {
          callback(new MatchError(error.message))
          return
        }

        callback(null, userFound.username)
      })
    })
    .catch(error => callback(error))
}
export default authenticateUser
