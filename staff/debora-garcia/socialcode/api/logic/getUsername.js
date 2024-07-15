import { User } from "../data/index.js"
import validate from "com/validate.js"
import { SystemError, NotFoundError } from "com/errors.js"


const getUsername = (userId, targetUserId) => {
    //se pasan los paramentros demusuario y quien pide el usuario 
    validate.id(userId, "userId")
    validate.id(targetUserId, "targetUserId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user)
                        throw new NotFoundError("targetUsername not found")


                    return user.username
                })
        })
}

export default getUsername