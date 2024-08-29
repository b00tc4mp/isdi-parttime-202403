import { User, Post } from "../data/index.js"
import { SystemError, NotFoundError } from "com/errors.js"
import validate from "com/validate.js"

const getPostComments = (userId, postId) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")

  return User.findById(userId).lean()
    .catch((error) => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError("❌ User not found ❌")
      }

      return Post.findById((postId)).populate("comments.author", "username").lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(post => {
          if (!post) {
            throw new NotFoundError("❌ Post not found ❌")
          }

          post.comments.forEach(comment => {
            comment.id = comment._id.toString()
            delete comment._id
          })

          post.comments.forEach(comment => {
            if (comment.author._id) {
              comment.author.id = comment.author._id.toString()
              delete comment.author._id
            }
          })
          return post.comments
        })

    })
}

export default getPostComments