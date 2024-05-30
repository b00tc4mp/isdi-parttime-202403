const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

const ID_REGEX = /^[0-9]+-[0-9]+$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
  if (!NAME_REGEX.test(name))
    throw new ContentError("❌ name is not valid ❌")

  if (!NAME_REGEX.test(surname))
    throw new ContentError("❌ surname is not valid ❌")

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
    throw new TypeError("callback is not a function")
  }




  const xhr = new XMLHttpRequest
  xhr.onload = () => {
    debugger

    if (xhr.status === 201) {
      callback(null)
      console.log("user registered")
      return
    }
    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("POST", "http://localhost:8080/users")

  const body = { name, surname, email, username, password, passwordRepeat }

  const json = JSON.stringify(body)

  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(json)
}

logic.loginUser = (username, password, callback) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  } // Comprobamos si el usuario introduce correctamente los caracteres para no cargar con peticiones al servidor

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function")


  const xhr = new XMLHttpRequest
  xhr.onload = () => {

    if (xhr.status === 200) {
      sessionStorage.username = username

      callback(null)
      console.log("user logged in")
      return

    }

    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("POST", "http://localhost:8080/users/auth")
  const body = { username, password }

  const json = JSON.stringify(body)

  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(json)
}

logic.logoutUser = () => {
  delete sessionStorage.username
}

logic.isUserLoggedIn = () => {
  // if (sessionStorage.username)
  //     return true

  // return false

  // return sessionStorage.username ? true : false

  return !!sessionStorage.username
}



logic.getUserName = (callback) => {

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function")


  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    if (xhr.status === 200) {

      const name = JSON.parse(xhr.response)


      callback(null, name)

      return
    }

    const { error, message } = JSON.parse(xhr.response)



    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("GET", `http://localhost:8080/users/${sessionStorage.username}`)
  xhr.setRequestHeader("Authorization", `Basic ${sessionStorage.username}`)

  xhr.send()
}


logic.getAllPosts = (callback) => {
  if (typeof callback !== "function")
    throw new TypeError("callback is not a function")


  const xhr = new XMLHttpRequest
  xhr.onload = () => {

    if (xhr.status === 200) {
      const posts = JSON.parse(xhr.response)

      callback(null, posts)
      return

    }
    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("GET", "http://localhost:8080/posts")
  xhr.send()
}

logic.createPost = (title, image, description, callback) => {
  if (typeof title !== "string" || !title.length || title.length > 30) {
    throw new ContentError("Title is not valid")
  }

  if (typeof image !== "string" || !image.startsWith("http")) {
    throw new ContentError("Image is not valid")
  }

  if (typeof description !== "string" || !description.length || description.length > 600) {
    throw new ContentError("Description is not valid")
  }

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function")


  const xhr = new XMLHttpRequest
  xhr.onload = () => {
    if (xhr.status === 201) {

      callback(null)

      return
    }
    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("POST", "http://localhost:8080/posts")
  xhr.setRequestHeader("Authorization", `Basic ${sessionStorage.username}`)
  xhr.setRequestHeader("Content-Type", "application/json")

  const body = {
    title: title,
    image: image,
    description: description,

  };

  const json = JSON.stringify(body)
  xhr.send(json)
}

logic.getLoggedInUsername = () => { return sessionStorage.username }



logic.deletePost = (postId, callback) => {
  if (!ID_REGEX.test(postId))
    throw new ContentError("postId is not valid")

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function")

  const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    if (xhr.status === 204) {
      callback(null)
      return
    }

    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("DELETE", `http://localhost:8080/posts/${postId}`)
  xhr.setRequestHeader("Authorization", `Basic ${sessionStorage.username}`)
  xhr.send()
}
