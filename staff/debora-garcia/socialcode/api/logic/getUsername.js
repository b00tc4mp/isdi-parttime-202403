import validate from "com/validate.js"
import data from "../data/index.js" // importamos el objeto data
import { MatchError,SystemError } from "com/errors.js"


const getUsername = (username, targetUsername, callback) => {
    //se pasan los paramentros demusuario y quien pide el usuario 
    validate.username(username)
    validate.username(targetUsername, "targetUsername")
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }

            data.users.findOne({ username: targetUsername })
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