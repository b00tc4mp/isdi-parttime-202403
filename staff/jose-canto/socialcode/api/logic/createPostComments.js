import { User, Post } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

const createPostComment = (userId, postId, textComment) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")
  validate.text(textComment, "textComment", 150)

  return User.findById(userId).lean()
    .catch((error) => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError("❌ User not found ❌")
      }

      return Post.findById(postId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(post => {
          if (!post) {
            throw new NotFoundError("❌ Post not found ❌")
          }

          return Post.findByIdAndUpdate((postId), { $push: { comments: { author: userId, text: textComment, date: new Date() } } })
            .catch((error) => { throw new SystemError(error.message) })
            .then(() => post)
        })
    })
}
export default createPostComment