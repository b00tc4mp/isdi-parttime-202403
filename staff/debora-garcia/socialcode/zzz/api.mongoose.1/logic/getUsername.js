import { User } from "../data/index.js"
import validate from "com/validate.js"
import { MatchError,SystemError } from "com/errors.js"


const getUsername = (username, targetUsername, callback) => {
    //se pasan los paramentros demusuario y quien pide el usuario 
    validate.username(username)
    validate.username(targetUsername, "targetUsername")
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }

            User.findOne({ username: targetUsername })
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