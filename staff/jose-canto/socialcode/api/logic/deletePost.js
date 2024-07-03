import { User, Post } from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { ObjectId } from "mongodb"


const deletePost = (username, postId, callback) => {
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

          if (post.author !== username) {
            callback(new MatchError("❌ You can't delete this post ❌"))
            return
          }

          Post.deleteOne({ _id: new ObjectId(postId) })
            .then(() => callback(null, postId))
            .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(new SystemError(error.message)))
}

export default deletePost