import validate from "com/validate.js"
import data from "../data/index.js"
import bcrypt from "bcryptjs"
import { DuplicityError, SystemError } from "com/errors.js"

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
  validate.name(name)
  validate.name(surname, "surname")
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)
  validate.callback(callback)

  data.users.findOne({ $or: [{ email }, { username }] })
    .then(user => {
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
        data.users.insertOne(newUser)
          .then(() => callback(null))
          .catch(error => callback(error))
      })
    })
    .catch(error => callback(new SystemError(error.message)))
}

export default registerUser