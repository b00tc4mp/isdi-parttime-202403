import errors from "com/error"

const { ContentError } = errors

const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=[\]{}<>()]{4,}$/

const loginUser = (username, password, callback) => {
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
      //sessionStorage.username = username

      const token = JSON.parse(xhr.response)

      sessionStorage.token = token

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

export default loginUser