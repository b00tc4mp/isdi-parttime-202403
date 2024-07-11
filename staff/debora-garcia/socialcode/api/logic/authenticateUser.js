import { User } from "../data/index.js"
// importamos el objeto data
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import bcrypt from "bcryptjs"


// cambiamos el nombre de loginUser a authentication, ya que no cuardamos estado sesion, no guardamos datos, solo validamos. Las APIs son stateless
const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)
    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError("user not found")

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) {
                        throw new MatchError("wrong password")
                    }
                    return user._id.toString()
                })
        })
}
export default authenticateUser