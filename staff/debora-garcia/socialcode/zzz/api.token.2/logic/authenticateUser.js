import data from "../data/index.js" // importamos el objeto data
import { ContentError, MatchError } from "../errors.js"

const USERNAME_REGEX = /^[\w-]+$/

const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/

// cambiamos el nombre de loginUser a authentication, ya que no cuardamos estado sesion, no guardamos datos, solo validamos. Las APIs son stateless
const authenticateUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")
    // estamos buscando en la base de datos, que coincida el dato que le mandamos
    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        // los errores los mandamos al callback (no puede ser throw(syncro))
        if (!user) {
            callback(new MatchError("user not found"))

            return
        }

        if (user.password !== password) {
            callback(new MatchError("wrong password"))

            return
        }

        // si la autentificacion va bien mandamos error->null
        callback(null)
    })
}

export default authenticateUser