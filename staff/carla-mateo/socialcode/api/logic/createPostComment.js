import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'

const createPostComment = (userId, postId, comment, callback) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 100)
    validate.callback(callback)

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new MatchError('❌ User not found'))

                return
            }

            Post.findById(postId)
                .then(post => {
                    if (!post) {
                        callback(new MatchError('❌ Post not found'))

                        return
                    }

                    Post.findByIdAndUpdate((postId), { $push: { comments: { author: userId, date: new Date(), comment: comment } } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))



}

export default createPostComment