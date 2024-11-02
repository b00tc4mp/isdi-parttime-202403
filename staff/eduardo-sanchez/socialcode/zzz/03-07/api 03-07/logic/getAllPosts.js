import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPosts = (userId, callback) => {
    validate.id(userId, 'userId')
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            Post.find({}).select('-__v').sort({ date: -1 }).lean()
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        post.author = post.author.toString()

                        delete post._id
                    })

                    callback(null, posts)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getAllPosts