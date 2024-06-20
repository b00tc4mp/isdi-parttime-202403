import data from "../data/index.js"
import errors from "com/errors.js"
import validate from "com/validate.js"

const { MatchError } = errors

const getAllPosts = (username, callback) => {

  validate.username(username)
  validate.callback(callback)

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