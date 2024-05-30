import data from "../data/index.js"
import { ContentError, DuplicityError, MatchError, SystemError } from "../error.js"
import utils from "../public/app/utils.js"

const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

const ID_REGEX = /^[0-9]+-[0-9]+$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
  if (!NAME_REGEX.test(name))
    throw new ContentError('❌ name is not valid ❌')

  if (!NAME_REGEX.test(surname))
    throw new ContentError('❌ surname is not valid ❌')

  if (!EMAIL_REGEX.test(email)) {
    throw new ContentError("❌ Email is not valid ❌")
  }

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  if (password !== passwordRepeat) {
    throw new MatchError("❌ Password don't match ❌")
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback is not a function")

  }

  data.findUser((user) => user.email.toLowerCase() === email.toLowerCase() || user.username.toLowerCase() === username.toLowerCase(), (error, user) => {

    if (error) {
      callback(error)

      return
    }

    if (user) {
      callback(new DuplicityError("❌ Users already exists ❌"))

      return
    }

    const newUser = {
      name: name,
      surname: surname,
      email: email,
      username: username,
      password: password,
    }

    data.insertUser(newUser, error => {
      if (error) {
        callback(error)

        return
      }

      callback(null)

    })
  })
}

logic.authenticateUser = (username, password, callback) => {

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  if (typeof callback !== "function") {
    throw new TypeError("Callback is not a function")

  }

  data.findUser((user) => user.username === username, (error, userFound) => {

    if (error) {
      callback(error)
      return
    }

    if (!userFound) {
      //alert("❌Login incorrecto ❌")
      callback(new MatchError("❌ User not found ❌"))

      return

    }

    if (userFound.password !== password) {
      callback(new MatchError("❌ Wrong password ❌"))

      return
    }

    callback(null, userFound.username)
  })

}


logic.getUserName = (username, targetUsername, callback) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!USERNAME_REGEX.test(targetUsername)) {
    throw new ContentError("❌ targetUsername is not valid ❌")
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

    data.findUser(user => user.username === targetUsername, (error, targetUser) => {

      if (error) {
        callback(error)

        return
      }

      if (!targetUser) {

        callback(new MatchError("❌ targetUser not found ❌"))

        return
      }

      callback(null, targetUser.name)
    })
  })
}

logic.logoutUser = () => {
  delete sessionStorage.username
}

logic.getAllPosts = (callback) => {

  data.findPosts(() => true, (error, posts) => {

    if (error) {
      callback(error.message)

      return
    }

    callback(null, posts.reverse())
  })
}

logic.createPost = (username, title, image, description, callback) => {

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
      date: utils.getDateStringDayMonthYearFormat(),
    };

    data.insertPost(post, error => {

      if (error) {

        callback(error)
        return
      }
      callback(null)
    })
  })
}

logic.getLoggedInUsername = () => { return sessionStorage.username }

logic.deletePost = (username, postId, callback) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!ID_REGEX.test(postId)) {
    throw new ContentError("❌ postId is not valid ❌")
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
    data.findOnePost(post => post.id === postId, (error, post) => {

      if (error) {
        callback(error)
        return

      }
      if (!post) {
        callback(new MatchError("❌ Post not found ❌"))
        return
      }

      if (post.author !== username) {
        callback(new MatchError("❌ You can't delete this post ❌"))

        return
      }

      data.deletePost(post => post.id === postId, (error,) => {
        if (error) {
          callback(error)
          return
        }
        callback(null)
      })
    })

  })
}

export default logic