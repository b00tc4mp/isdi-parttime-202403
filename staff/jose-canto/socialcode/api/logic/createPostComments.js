import { User, Post } from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

const createPostComment = (userId, postId, textComment, callback) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")
  validate.text(textComment, "textComment", 150)
  validate.callback(callback)

  User.findById(userId)
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      Post.findById(postId)
        .then(post => {
          if (!post) {

            callback(new MatchError("❌ Post not found ❌"))

            return
          }

          Post.findByIdAndUpdate((postId), { $push: { comments: { author: userId, text: textComment, date: new Date() } } })
            .then(() => callback(null))
            .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))

    })
    .catch(error => callback(new SystemError(error.message)))
}

export default createPostComment