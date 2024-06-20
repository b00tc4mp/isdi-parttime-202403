import data from "../data/index.js"
import { MatchError } from "com/errors.js"
import validate from "com/validate.js"

const createPost = (username, title, image, description, callback) => {

  validate.username(username)
  validate.text(title, "title", 50)
  validate.url(image, "image")
  validate.text(description, "description", 200)
  validate.callback(callback)

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
      likes: 0,
      liked: []
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