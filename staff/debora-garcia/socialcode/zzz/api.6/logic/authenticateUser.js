import data from "../data/index.js" // importamos el objeto data
import { ContentError, MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"


// cambiamos el nombre de loginUser a authentication, ya que no cuardamos estado sesion, no guardamos datos, solo validamos. Las APIs son stateless
const authenticateUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)
    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }
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

            callback(null)
        })
        .catch(error => callback(new SystemError(error.message)))

}

export default authenticateUser