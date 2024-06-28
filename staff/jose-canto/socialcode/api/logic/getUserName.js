import data from "../data/index.js"
import { MatchError } from "com/errors.js"
import validate from "com/validate.js"

const getUserName = (username, targetUsername, callback) => {
  validate.username(username)
  validate.username(targetUsername, "targetUsername")
  validate.callback(callback)

  data.users.findOne({ username })
    .then(user => {

      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      data.users.findOne({ username: targetUsername })
        .then(targetUser => {
          if (!targetUser) {

            callback(new MatchError("❌ targetUser not found ❌"))

            return
          }

          callback(null, targetUser.name)

        })
        .catch(error => callback(error))
    })
    .catch(error => callback(error))
}

export default getUserName