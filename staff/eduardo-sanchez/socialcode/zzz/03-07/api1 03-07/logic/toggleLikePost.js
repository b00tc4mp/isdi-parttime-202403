import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'

import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

// import { ObjectId } from 'mongodb'

function toggleLikePost(username, postId, callback) {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findOne({ username }).lean()
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

                    const index = post.likes.indexOf(username)

                    if (index < 0)
                        post.likes.push(username)
                    else
                        post.likes.splice(index, 1)

                    post.save()
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost