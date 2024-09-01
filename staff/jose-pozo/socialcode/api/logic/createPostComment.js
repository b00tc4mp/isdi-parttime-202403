import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

import { Types } from 'mongoose'

const { ObjectId } = Types

const createComment = (userId, postId, comment) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 200)

    return User.findById(userId).lean()
        .catch(error => { throw SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new MatchError('user not found')
            }

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) {
                        throw new MatchError('post not found')
                    }

                    return Post.updateOne({ _id: post._id }, { $push: { comments: { author: userId, comment: comment, date: new Date() } } })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default createComment