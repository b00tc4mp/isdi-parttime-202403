import { User, Post } from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

const createPost = (userId, title, image, description, callback) => {
  validate.id(userId, "userId")
  validate.text(title, "title", 30)
  validate.url(image, "image")
  validate.text(description, "description", 500)
  validate.callback(callback)

  User.findById(userId).lean()
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      const post = {
        author: userId,
        title: title,
        image: image,
        description: description,
        date: new Date,
        liked: [],
        comments: []
      }

      Post.create(post)
        .then(() => callback(null))
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(new SystemError(error.message)))

}

export default createPost