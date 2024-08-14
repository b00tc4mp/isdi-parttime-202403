
import { User } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getAllUsers = (parent) => {

    return User.find({ parent }).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(users => {
            if (!users) {
                throw new NotFoundError("Users not found with role 'user'")
            }

            return users
        })


}
export default getAllUsers