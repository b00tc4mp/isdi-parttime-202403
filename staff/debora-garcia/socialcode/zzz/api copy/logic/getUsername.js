import validate from "com/validate.js"
import data from "../data/index.js" // importamos el objeto data
import { MatchError } from "com/errors.js"


const getUsername = (username, targetUsername, callback) => {
    //se pasan los paramentros demusuario y quien pide el usuario 
    validate.username(username)
    validate.username(targetUsername, "targetUsername")
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError("user not found"))

            return
        }

        data.findUser(user => user.username === targetUsername, (error, targetUser) => {
            if (error) {
                callback(error)

                return
            }

            if (!targetUser) {
                callback(new MatchError("targetUser not found"))

                return
            }

            callback(null, targetUser.username)
            // TODO cambiar a que devuelva name,
        })
    })

}

export default getUsername