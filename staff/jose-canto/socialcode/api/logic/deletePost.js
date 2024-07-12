import { User, Post } from "../data/index.js"
import { MatchError, NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { Types } from "mongoose"

const { ObjectId } = Types

const deletePost = (userId, postId) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")

  return User.findById(userId).lean()
    .catch(() => { throw new SystemError("server error") })
    .then(user => {
      if (!user) {
        throw new NotFoundError("❌ User not found ❌")
      }

      return Post.findById(postId).lean()
        .catch(() => { throw new SystemError("server error") })
        .then(post => {
          if (!post) {
            throw new NotFoundError("❌ Post not found ❌")
          }
          if (post.author.toString() !== userId) {
            throw new MatchError("❌ You can't delete this post ❌")
          }

          return Post.deleteOne({ _id: new ObjectId(postId) })
            .catch(() => { throw new SystemError("server error") })
            .then(() => postId)
        })
    })
}
export default deletePost