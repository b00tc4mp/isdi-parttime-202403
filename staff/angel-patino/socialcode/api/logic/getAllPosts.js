import data from '../data/index.js'
import { MatchError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPosts = (username, callback) => {
    validate.username(username)
    validate.callbakc(callback)

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