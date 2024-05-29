import data from "../data/index.js"
import { ContentError, DuplicityError, MatchError, SystemError } from "../error.js"
import utils from "../public/app/utils.js"

const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

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

  data.findUser((user) => user.email === email || user.username === username, (error, user) => {

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

logic.isUserLoggedIn = () => {
  // if (sessionStorage.username)
  //     return true

  // return false

  // return sessionStorage.username ? true : false

  return !!sessionStorage.username
}

// logic.getUserName = () => {
//   let user = data.findUser((user) => {
//     return user.username === sessionStorage.username
//   })

//   return user.username
// }

logic.getUserName = (callback) => {


  data.findUser((user) => user.username === "Luna", (error, users) => {
    if (error) {
      callback(new SystemError(error.message))
      return
    }

    callback(null, users)
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

logic.deletePost = id => data.deletePost(post => post.id === id)


export default logic