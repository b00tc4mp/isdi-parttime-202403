import data from "../data/index.js"
import errors from "com/error.js"

const { ContentError, MatchError } = errors

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

const getAllPosts = (username, callback) => {

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
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

    data.findPosts(() => true, (error, posts) => {

      if (error) {
        callback(error.message)

        return
      }

      callback(null, posts.reverse())
    })
  })
}

export default getAllPosts