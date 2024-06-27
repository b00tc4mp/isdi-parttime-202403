import data from "../data/index.js"
import errors from "com/errors.js"
import validate from "com/validate.js"

const { MatchError } = errors

const getAllPosts = (username, page, limit, callback) => {

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

      posts.reverse()

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      const paginatedPost = posts.slice(startIndex, endIndex)

      callback(null, paginatedPost);
    })
  })
}

export default getAllPosts