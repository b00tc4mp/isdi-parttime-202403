import data from "../data/index.js" // importamos el objeto data
import { ContentError, MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"


// cambiamos el nombre de loginUser a authentication, ya que no cuardamos estado sesion, no guardamos datos, solo validamos. Las APIs son stateless
const authenticateUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

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

       /*  if (user.password !== password) {
            callback(new MatchError("wrong password"))

            return
        } */

        //compara el hash almacenado con el pasword que recibe el usuario
        bcrypt.compare(password, user.password, (error, match) => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }
            if (!match) {
                callback(new MatchError("wrong password"))

                return
            }
        })

        // si la autentificacion va bien mandamos error->null
        callback(null)
    })
}

export default authenticateUser