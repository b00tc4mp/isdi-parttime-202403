import validate from "com/validate.js"
import { User } from "../model/index.js"
import bcrypt from "bcryptjs"
import { SystemError, DuplicityError } from "com/errors.js"


const registerUser = (fullName, username, email, password, passwordRepeat) => {

  validate.name(fullName, "full name")
  validate.username(username)
  validate.email(email)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return User.findOne({ $or: [{ username }, { email }] })
    .catch(() => { throw new SystemError("Connection error") })
    .then(user => {
      if (user) {
        throw new DuplicityError("User already exists")
      }

      return bcrypt.hash(password, 10)
        .catch(() => { throw new SystemError("Connection error") })
        .then((hash) => {

          const newUser = {
            fullName,
            username,
            email,
            password: hash,
            companyName: "",
            adress: "",
            taxId: "",
            phone: "",
            bankAccout: "",
            role: "",
            companyLogo: ""
          }

          return User.create(newUser)
            .catch(() => { throw new SystemError("Connection error") })
            .then(() => { })
        })
    })
}

export default registerUser