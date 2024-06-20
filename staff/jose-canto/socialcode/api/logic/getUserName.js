import data from "../data/index.js"
import errors from "com/error.js"

const { ContentError, MatchError } = errors

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

const getUserName = (username, targetUsername, callback) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!USERNAME_REGEX.test(targetUsername)) {
    throw new ContentError("❌ targetUsername is not valid ❌")
  }

  if (typeof callback !== "function") {
    throw new MatchError("Callback is not a function")
  }

  data.findUser(user => user.username === username, (error, user) => {

    if (error) {
      callback(error)

      return
    }

    if (!user) {

      callback(new MatchError("❌ User not found ❌"))

      return
    }

    data.findUser(user => user.username === targetUsername, (error, targetUser) => {

      if (error) {
        callback(error)

        return
      }

      if (!targetUser) {

        callback(new MatchError("❌ targetUser not found ❌"))

        return
      }

      callback(null, targetUser.name)
    })
  })
}

export default getUserName