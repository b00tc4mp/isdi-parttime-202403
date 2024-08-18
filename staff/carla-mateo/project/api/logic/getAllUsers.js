import { User } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"
import Validate from "com/validate.js"

const getAllUsers = (userId) => {
    Validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError("user not found")
            }
            return User.find({ parent: userId }).lean()
                .catch((error) => { throw new SystemError(error.message) })
                .then(users => {
                    if (!users.length) {
                        throw new NotFoundError("parent not found")
                    }
                    users.forEach((user) => {
                        user.id = user._id.toString()
                        delete user._id

                        if (user.parent) {
                            user.parent = user.parent.toString()
                        }
                    })
                    return users
                })
        })
}

export default getAllUsers