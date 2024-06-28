import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {

            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            data.posts.find({}).toArray()
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post.id
                    })

                    callback(null, posts.reverse())
                })
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getAllPosts