import data from "../data/index.js"
import errors from "com/error.js"

const { ContentError } = errors

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

const authenticateUser = (username, password, callback) => {

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback is not a function")

  }

  data.findUser((user) => user.username === username, (error, userFound) => {

    if (error) {
      callback(error)
      return
    }

    if (!userFound) {
      callback(new MatchError("❌ User not found ❌"))

      return
    }

    if (userFound.password !== password) {
      callback(new MatchError("❌ Wrong password ❌"))

      return
    }

    callback(null, userFound.username)
  })

}

export default authenticateUser