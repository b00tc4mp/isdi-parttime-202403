import data from '../data/index.js'
import { MatchError } from 'com/errors.js'
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

                        delete post._id
                    })

                    callback(null, posts)
                })
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}

export default getAllPosts