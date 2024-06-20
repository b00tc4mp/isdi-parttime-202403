import data from '../data/index.js'
import { ContentError, MatchError } from '../errors.js'


const USERNAME_REGEX = /^[\w-]+$/



const getUserName = (username, targetUsername, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!USERNAME_REGEX.test(targetUsername))
        throw new ContentError('targetUsername is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        data.findUser(user => user.username === targetUsername, (error, targetUser) => {
            if (error) {
                callback(error)

                return
            }

            if (!targetUser) {
                callback(new MatchError('targetUser not found'))

                return
            }

            callback(null, targetUser.name)
        })
    })
}

export default getUserName