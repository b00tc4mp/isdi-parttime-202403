import data from '../data/index.js'
import bcrypt from 'bcryptjs'
import { DuplicityError, SystemError } from 'com/errors.js'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

const ID_REGEX = /^[0-9]+-[0-9]+$/


const registerUser = (name, surname, email, username, password, repeatPassword, callback) => {
    if (!USERNAME_REGEX.test(name))
        throw new ContentError('nombre no válido')

    if (!USERNAME_REGEX.test(surname))
        throw new ContentError('surname no válido')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('Esta cuenta de correo no es correcta')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('nombre de usuario no válido')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('La contraseña no cumple los criterios')

    if (password !== repeatPassword)
        throw new MatchError('los campos de contraseña no coinciden')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (user) {
            callback(new DuplicityError('user already exists'))

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
                password: hash
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
