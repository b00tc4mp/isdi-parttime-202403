import { User, Post } from '../data/index.js'
import { ObjectId } from 'mongodb'
import { ContentError, MatchError, SystemError, } from 'com/errors.js'
import validate from 'com/validate.js'


const toggleLikePost = (username, postId, callback) => {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new ContentError('User not found'))

                return
            }

            Post.findOne({ _id: new Object(postId) })
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