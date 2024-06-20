import data from "../data/index.js"
import errors, { SystemError } from "com/errors.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"

const { MatchError } = errors


const authenticateUser = (username, password, callback) => {

  validate.username(username)
  validate.password(password)
  validate.callback(callback)

  data.findUser((user) => user.username === username, (error, userFound) => {

    if (error) {
      callback(error)
      return
    }

    if (!userFound) {
      callback(new MatchError("❌ User not found ❌"))

      return
    }

    // if (userFound.password !== password) {
    //   callback(new MatchError("❌ Wrong password ❌"))

    //   return
    // }

    bcrypt.compare(password, userFound.password, (error, match) => {
      if (error) {
        callback(new SystemError("❌ Wrong password ❌"))

        return
      }
      if (!match) {
        callback(new MatchError("❌ Wrong password ❌"))

        return
      }
    })

    callback(null)
  })

}

export default authenticateUser