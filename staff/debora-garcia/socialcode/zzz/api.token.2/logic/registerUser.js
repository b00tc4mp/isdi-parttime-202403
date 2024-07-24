import data from "../data/index.js" // importamos el objeto data
import { ContentError, DuplicityError, MatchError } from "../errors.js"

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/

const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/

//añadimos el callback para poder trabajar en asincronia
const registerUser = (email, username, password, passwordRepeat, callback) => {

    if (!EMAIL_REGEX.test(email)) // .test funciona comprobamndo que el valor que lo pases contenga esos caracteres
        throw new ContentError("email is not valid")

    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")

    if (password !== passwordRepeat)
        throw new MatchError("passwords don't match")

    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")


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

        const newUser = {
            email: email,
            username: username,
            password: password
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
}

export default registerUser
