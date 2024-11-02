import data from '../data/index.js'
import { ContentError, MatchError } from '../errors.js'

const USERNAME_REGEX = /^[\w-]+$/

const getAllPosts = (username, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

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

        data.findPosts(() => true, (error, posts) => {
            if (error) {
                callback(error)

                return
            }

            callback(null, posts.reverse())
        })
    })
}

export default getAllPosts