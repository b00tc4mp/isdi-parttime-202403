import { User, Post } from "../data/index.js"
import { SystemError, MatchError } from "com/errors.js"
import validate from "com/validate.js"
import { ObjectId } from "mongodb"

const getPostComments = (username, postId, callback) => {
  validate.username(username)
  validate.id(postId, "postId")
  validate.callback(callback)

  User.findOne({ username }).lean()
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      Post.findOne({ _id: new ObjectId(postId) }).lean()
        .then(post => {
          if (!post) {
            callback(new MatchError("❌ Post not found ❌"))
            return
          }

          callback(null, post.comments)
        })
        .catch(error => callback(new SystemError(error.message)))

    })
    .catch(error => callback(error))
}

export default getPostComments