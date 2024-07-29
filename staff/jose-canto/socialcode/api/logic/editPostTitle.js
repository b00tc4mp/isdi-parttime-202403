import { User, Post } from "../data/index.js"
import { MatchError, NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"


const editPostTitle = (userId, postId, title) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")
  validate.text(title, "title", 30)

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
          // if (post.author.toString() !== userId) {
          //   throw new MatchError("❌ You can't delete this comment ❌")
          // }

          return Post.findByIdAndUpdate(postId, { title: title }, { new: true }).lean()
            .catch((error) => { throw new SystemError(error.message) })
            .then(() => { })
        })
    })
}

export default editPostTitle
