import data from "../data/index.js";
import { ContentError, DuplicityError, MatchError } from "../errors.js";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/

const logic = {}

logic.registerUser = (
    name,
    surname,
    email,
    username,
    password,
    repeatPassword,
    callback
) => {
    if (!USERNAME_REGEX.test(name)) throw new ContentError('nombre no válido')
    if (!USERNAME_REGEX.test(surname)) throw new ContentError('surname no válido')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('Esta cuenta de correo no es correcta')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('nombre de usuario no válido')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('La contraseña no cumple los criterios')

    if (password !== repeatPassword)
        throw new MatchError('los campos de contraseña no coinciden')

    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (user) {
            callback(new DuplicityError('user already exists'))

            return
        }

        const newUser = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password
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

//Logic Login

//   logic.loginUser = (username, password) => {
//     if (!USERNAME_REGEX.test(username)) {
//       throw new ContentError('username no válido')
//     }
//     if (!PASSWORD_REGEX.test(password)) {
//       throw new ContentError('password no válido')
//     }
//     const newUser = { username: username }
//     const user = data.findUser((user) => {
//       return user.username === username
//     })

//     if (user) {
//       if (user.password === password) {
//         sessionStorage.username = username
//         window.location.href = '../home/index.html'
//       } else {
//         throw new ContentError('password incorrecto')
//       }
//     } else {
//       alert('Usuario no existe. Serás redirigido a la página de registro.')
//       window.location.href = '../register/index.html'
//     }
//   }

export default logic