import validate from 'com/validate.js'
import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'

const getAllPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('User not found'))

                return
            }

            Post.find({}).sort({ date: -1 }).lean()
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post._id
                    })
                    callback(null, posts)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}


export default getAllPosts