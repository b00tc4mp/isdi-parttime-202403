import data from "../data/index.js"
import errors from "com/error.js"

const { ContentError, MatchError } = errors

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

const createPost = (username, title, image, description, callback) => {

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (typeof title !== "string" || !title.length || title.length > 30) {
    throw new ContentError("Title is not valid")
  }

  if (typeof image !== "string" || !image.startsWith("http")) {
    throw new ContentError("Image is not valid")
  }

  if (typeof description !== "string" || !description.length || description.length > 600) {
    throw new ContentError("Description is not valid")
  }

  if (typeof callback !== "function") {
    throw new MatchError("Callback is not a function")
  }

  data.findUser(user => user.username === username, (error, user) => {

    if (error) {

      callback(error)
      return
    }

    if (!user) {

      callback(new MatchError("❌ User not found ❌"))

      return
    }

    const post = {
      // id: Date.now(), data.insertPost() nos genera un id automático ya creado 
      author: username,
      title: title,
      image: image,
      description: description,
      date: Date.now(),
      likes: [],
      //date: utils.getDateStringDayMonthYearFormat(),
    }

    data.insertPost(post, error => {

      if (error) {

        callback(error)
        return
      }
      callback(null)
    })
  })
}

export default createPost