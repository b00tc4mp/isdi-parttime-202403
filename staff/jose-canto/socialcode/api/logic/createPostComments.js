import { User, Post } from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { ObjectId } from "mongodb"

const createPostComment = (username, postId, textComment, callback) => {
  validate.username(username)
  validate.id(postId, "postId")
  validate.text(textComment, "description", 150)
  validate.callback(callback)

  User.findOne({ username }).lean()
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      Post.findOne({ _id: new ObjectId(postId) })
        .then(post => {
          if (!post) {

            callback(new MatchError("❌ Post not found ❌"))

            return
          }

          Post.findByIdAndUpdate({ _id: new ObjectId(postId) }, { $push: { comments: { author: username, text: textComment, date: new Date() } } })
            .then(() => callback(null))
            .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))

    })
    .catch(error => callback(new SystemError(error.message)))
}

export default createPostComment