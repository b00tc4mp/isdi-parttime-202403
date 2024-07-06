import { User } from "../data/index.js"
import validate from "com/validate.js"
import { MatchError, SystemError } from "com/errors.js"


const getUsername = (userId, targetUserId, callback) => {
    //se pasan los paramentros demusuario y quien pide el usuario 
    validate.id(userId)
    validate.id(targetUserId, "targetUserId")
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }

            User.findById(targetUserId).lean()
                .then(user => {
                    if (!user) {
                        callback(new MatchError("targetUsername not found"))

                        return
                    }
                    callback(null, user.username)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))

}

export default getUsername