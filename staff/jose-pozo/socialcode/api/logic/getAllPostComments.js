import { User, Post } from '../dataMongoose/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllComments = (userId, postId, callback) => {
    validate.id(userId)
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findOne(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            Post.findById(postId).lean()
                .then(post => {
                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    const comments = post.comments.reverse()

                    callback(null, comments)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getAllComments