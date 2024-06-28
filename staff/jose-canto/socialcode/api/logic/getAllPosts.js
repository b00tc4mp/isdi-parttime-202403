import data from "../data/index.js"
import { SystemError, MatchError } from "com/errors.js"
import validate from "com/validate.js"


const getAllPosts = (username, page, limit, callback) => {

  validate.username(username)
  validate.callback(callback)

  data.users.findOne({ username })
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      data.posts.find({}).toArray()
        .then(posts => {
          posts.forEach(post => {
            post.id = post._id.toString()

            delete post._id
          })

          posts.reverse()

          const startIndex = (page - 1) * limit
          const endIndex = startIndex + limit

          const paginatedPost = posts.slice(startIndex, endIndex)

          callback(null, paginatedPost);
        })
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(error))
}

export default getAllPosts