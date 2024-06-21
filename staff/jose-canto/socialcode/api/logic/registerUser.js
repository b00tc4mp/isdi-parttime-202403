import validate from "com/validate.js"
import data from "../data/index.js"
import bcrypt from "bcryptjs"


const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
  validate.name(name)
  validate.name(surname, "surname")
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)
  validate.callback(callback)

  data.findUser((user) => user.email.toLowerCase() === email.toLowerCase() || user.username.toLowerCase() === username.toLowerCase(), (error, user) => {

    if (error) {
      callback(error)

      return
    }

    if (user) {
      callback(new DuplicityError("❌ Users already exists ❌"))

      return
    }

    bcrypt.hash(password, 8, (error, hash) => {
      if (error) {
        callback(new SystemError(error.message))
        return
      }

      const newUser = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: hash,
      }
      data.insertUser(newUser, error => {
        if (error) {
          callback(error)

          return
        }

        callback(null)
      })
    })
  })
}

export default registerUser