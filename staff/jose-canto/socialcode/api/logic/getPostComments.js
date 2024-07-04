import { User, Post } from "../data/index.js"
import { SystemError, MatchError } from "com/errors.js"
import validate from "com/validate.js"

const getPostComments = (userId, postId, callback) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")
  validate.callback(callback)

  User.findById(userId).lean()
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      Post.findById((postId)).populate("comments.author", "username").lean()
        .then(post => {
          if (!post) {
            callback(new MatchError("❌ Post not found ❌"))
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

          callback(null, post.comments)
        })
        .catch(error => callback(new SystemError(error.message)))

    })
    .catch(error => callback(error))
}

export default getPostComments