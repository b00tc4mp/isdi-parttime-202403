import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

import { ObjectId } from 'mongodb'

const createComment = (userId, postId, comment, callback) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            Post.findById(postId)
                .then(post => {
                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    Post.updateOne({ _id: new ObjectId(postId) }, { $push: { comments: { author: userId, comment: comment, date: new Date().toLocaleString(), likes: [] } } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })

                .catch(error => callback(new SystemError(error.message)))


        })
        .catch(error => callback(new SystemError(error.message)))



}

export default createComment