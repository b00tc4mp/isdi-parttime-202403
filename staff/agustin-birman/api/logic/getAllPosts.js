import validate from 'com/validate.js'
import data from '../data/index.js'
import { MatchError } from 'com/errors.js'

const getAllPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('User not found'))

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