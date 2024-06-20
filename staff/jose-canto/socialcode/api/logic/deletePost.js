import data from "../data/index.js"
import errors from "com/error.js"

const { ContentError, MatchError } = errors

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

const ID_REGEX = /^[0-9]+-[0-9]+$/

const deletePost = (username, postId, callback) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!ID_REGEX.test(postId)) {
    throw new ContentError("❌ postId is not valid ❌")
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