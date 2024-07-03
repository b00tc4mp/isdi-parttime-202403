import { User } from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

const getUserName = (username, targetUsername, callback) => {
  validate.username(username)
  validate.username(targetUsername, "targetUsername")
  validate.callback(callback)

  User.findOne({ username }).lean()
    .then(user => {

      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      User.findOne({ username: targetUsername }).lean()
        .then(targetUser => {
          if (!targetUser) {

            callback(new MatchError("❌ targetUser not found ❌"))

            return
          }

          callback(null, targetUser.name)

        })
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(new SystemError(error.message)))
}

export default getUserName