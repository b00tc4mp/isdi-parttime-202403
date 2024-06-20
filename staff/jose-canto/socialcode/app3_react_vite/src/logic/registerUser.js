import errors from "com/errors"
import validate from "com/validate"

const { ContentError, MatchError } = errors

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const NAME_REGEX = /^[a-zA-Z=[\]{}<>()]{1,}$/

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
  if (!NAME_REGEX.test(name))
    throw new ContentError("❌ name is not valid ❌")

  if (!NAME_REGEX.test(surname))
    throw new ContentError("❌ surname is not valid ❌")

  if (!EMAIL_REGEX.test(email)) {
    throw new ContentError("❌ Email is not valid ❌")
  }

  validate.username(username)
  validate.password(password)


  if (password !== passwordRepeat) {
    throw new MatchError("❌ Password don't match ❌")
  }

  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function")
  }

  const xhr = new XMLHttpRequest
  xhr.onload = () => {
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

export default registerUser