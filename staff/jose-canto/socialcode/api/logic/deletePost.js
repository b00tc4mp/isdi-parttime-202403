import { User, Post } from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { Types } from "mongoose"

const { ObjectId } = Types

const deletePost = (userId, postId, callback) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")
  validate.callback(callback)

  User.findById(userId).lean()
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      Post.findById(postId).lean()
        .then(post => {
          if (!post) {
            callback(new MatchError("❌ Post not found ❌"))
            return
          }

          if (post.author.toString() !== userId) {
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