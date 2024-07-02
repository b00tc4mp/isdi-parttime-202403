import data from "../data/index.js" // importamos el objeto data
import { DuplicityError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"

//añadimos el callback para poder trabajar en asincronia
const registerUser = (email, username, password, passwordRepeat, callback) => {
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.callback(callback)

    data.users.findOne({ $or: [{ email }, { username }] })
        .then(user => {
            if (user) {
                callback(new DuplicityError("user already exists"))

                return
            }

            bcrypt.hash(password, 8, (error, hash) => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }

                const newUser = {
                    email: email,
                    username: username,
                    password: hash
                }

                //insertUser recibe dos parametros (user,callback) que el callback es el error
                data.users.insertOne(newUser)
                    .then(() => callback(null))
                    .catch(error => callback(new SystemError(error.message)))
            })
        })
        .catch(error => callback(new SystemError(error.message)))

}

export default registerUser
