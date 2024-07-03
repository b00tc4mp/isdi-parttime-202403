import { User, Post } from '../data/index.js'
import { ObjectId } from 'mongodb'
import { ContentError, MatchError, SystemError, } from 'com/errors.js'
import validate from 'com/validate.js'


const toggleLikePost = (userId, postId, callback) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new ContentError('User not found'))

                return
            }

            Post.findById(postId)
                .then(post => {
                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    const index = post.likes.indexOf(userId)

                    if (index < 0)
                        post.likes.push(userId)
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