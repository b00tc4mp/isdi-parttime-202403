import validate from "com/validate.js"
import { User } from "../data/index.js"
import bcrypt from "bcryptjs"
import { SystemError, CredentialsError, NotFoundError } from "com/errors.js"


const authenticateAdmin = (name, password) => {
    validate.name(name)
    validate.password(password)

    return User.findOne({ name }).lean()
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

                    return { id: user._id.toString(), role: user.role }
                })
        })
}

export default authenticateAdmin