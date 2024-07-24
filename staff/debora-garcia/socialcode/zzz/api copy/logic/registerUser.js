import data from "../data/index.js" // importamos el objeto data
import { DuplicityError } from "com/errors.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"

//añadimos el callback para poder trabajar en asincronia
const registerUser = (email, username, password, passwordRepeat, callback) => {
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.callback(callback)

    // let userRegistered = data.findUser(user => user.email === email || user.username === username) tenemos que hacerlo asyncro

    // find user tiene (condicion,callback) que a la vez callback tiene (error,user)
    // si no hay error del sistema devuelve (null y user)
    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) { // este es el error del sistema de data (error de archivo)
            callback(error)

            return
        }
        // aqui lanzaria error si ya se encuentra usuario
        if (user) {
            callback(new DuplicityError("user already exists"))

            return
        }
//
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
