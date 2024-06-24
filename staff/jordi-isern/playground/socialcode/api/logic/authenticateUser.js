import data from '../data/index.js'
import { MatchError } from "com/errors.js"
import validate from 'com/validate.js'
import { SystemError } from '../error.js'



const authenticateUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)

    data.findUser(user => user.username === username, (error , user) =>{
        if(error) {
            callback(error)

            return
        }
        if(!user) {
            callback(new MatchError('User not found'))

            return
        }

        bcryptt.compare(password,user.password, (error, match ) => {
            if(error){
                callback(new SystemError(error.message))

                return
            }
            if(!mattch){
                callback (MatchError('wrong password'))

                return
            }

        })

        callback(null)
    })
}

export default authenticateUser

