import validate from "com/validate.js"
import { User } from "../data/idex.js"
import bcrypt from "bcryptjs"
import { SystemError, CredentialsError, NotFoundError } from "com/errors.js"


const authenticateAdmin = (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username }).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError("User not found")
            }

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then((match) => {
                    if (!match) {
                        throw new CredentialsError("Wrong Password")
                    }

                    return user._id.toString()
                })
        })
}

export default authenticateAdmin