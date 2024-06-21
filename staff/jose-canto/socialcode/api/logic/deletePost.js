import data from "../data/index.js"
import errors from "com/errors.js"
import validate from "com/validate.js"

const { MatchError } = errors

const deletePost = (username, postId, callback) => {
  validate.username(username)
  validate.id(postId, "postId")
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
    data.findOnePost(post => post.id === postId, (error, post) => {

      if (error) {
        callback(error)
        return

      }
      if (!post) {
        callback(new MatchError("❌ Post not found ❌"))
        return
      }

      if (post.author !== username) {
        callback(new MatchError("❌ You can't delete this post ❌"))

        return
      }

      data.deletePost(post => post.id === postId, (error,) => {
        if (error) {
          callback(error)
          return
        }
        callback(null)
      })
    })
  })
}

export default deletePost