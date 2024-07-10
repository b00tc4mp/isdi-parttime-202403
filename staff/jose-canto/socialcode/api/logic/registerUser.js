import validate from "com/validate.js"
import { User } from "../data/index.js"
import bcrypt from "bcryptjs"
import { DuplicityError, SystemError } from "com/errors.js"

const registerUser = (name, surname, email, username, password, passwordRepeat) => {
  validate.name(name)
  validate.name(surname, "surname")
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return User.findOne({ $or: [{ email }, { username }] })
    .catch(() => { throw new SystemError("connection error") })
    .then(user => {
      if (user) {
        throw new DuplicityError("❌ Users already exists ❌")
      }

      return bcrypt.hash(password, 8)
        .catch(() => { throw (new SystemError("connection error")) })
        .then((hash) => {
          const newUser = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: hash,
          }

          return User.create(newUser)
            .catch(() => { throw new SystemError("connection error") })
            .then(() => {
              return
            })
        })
    })
}
export default registerUser