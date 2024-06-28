import data from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

const createPost = (username, title, image, description, callback) => {
  validate.username(username)
  validate.text(title, "title", 30)
  validate.url(image, "image")
  validate.text(description, "description", 500)
  validate.callback(callback)

  data.users.findOne({})
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      const post = {
        author: username,
        title: title,
        image: image,
        description: description,
        date: new Date,
        liked: []
      }

      data.posts.insertOne(post)
        .then(() => callback(null))
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(new SystemError(error.message)))

}

export default createPost