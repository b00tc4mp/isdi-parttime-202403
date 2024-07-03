import { User, Post } from '../dataMongoose/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

import { ObjectId } from 'mongodb'

const createComment = (username, postId, comment, callback) => {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            Post.findOne({ _id: new ObjectId(postId) })
                .then(post => {

                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    console.log(post._id)

                    Post.updateOne({ _id: new ObjectId(postId) }, { $push: { comments: { author: username, comment: comment, date: new Date().toLocaleDateString(), likes: [] } } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })

                .catch(error => callback(new SystemError(error.message)))


        })
        .catch(error => callback(new SystemError(error.message)))



}

export default createComment