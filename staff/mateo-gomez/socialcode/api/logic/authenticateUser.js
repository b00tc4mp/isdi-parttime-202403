import data from '../data/index.js'
import { MatchError } from 'com/errors.js'
import validate from 'com/validate.js'



const authenticateUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    data.findUser((user) => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        if (!user) {
            callback(new MatchError('User not found'))

            return

        }

        if (user.password !== password) {
            callback(new MatchError('wrong password'))

            return
        }

        callback(null)




    })

}


export default authenticateUser

