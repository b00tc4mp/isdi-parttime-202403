import data from "../data/index.js"
import errors from "com/error.js"

const { ContentError, MatchError, DuplicityError } = errors


const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/


const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
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

export default registerUser