import { User, Post } from "../data/index.js"
import { SystemError, NotFoundError } from "com/errors.js"
import validate from "com/validate.js"

const getPostComments = (userId, postId, callback) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")

  return User.findById(userId).lean()
    .catch(() => { throw new SystemError("server error") })
    .then(user => {
      if (!user) {
        throw new NotFoundError("❌ User not found ❌")
      }

      return Post.findById((postId)).populate("comments.author", "username").lean()
        .catch(() => { throw new SystemError(error.message) })
        .then(post => {
          if (!post) {
            callback(new NotFoundError("❌ Post not found ❌"))
            return
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