import { User, Post } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"


const editPostTitle = (userId, postId, title) => {
  validate.id(userId, "userId")
  validate.id(postId, "postId")
  validate.text(title, "title", 30)


  return User.findById(userId).lean()
    .catch(() => { throw new SystemError("connection error") })
    .then(user => {
      if (!user) {
        throw new NotFoundError("❌ User not found ❌")
      }

      return Post.findByIdAndUpdate(postId, { title: title }, { new: true }).lean()
        .catch(() => { throw new SystemError("connection error") })
        .then(post => {
          if (!post) {
            throw new NotFoundError("❌ Post not found ❌")
          }

          return post
        })
    })
}

export default editPostTitle
