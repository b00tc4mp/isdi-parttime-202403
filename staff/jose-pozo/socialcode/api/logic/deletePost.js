import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { ObjectId } from 'mongodb'

const deletePost = (username, postId, callback) => {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {

            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            data.posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {

                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    if (post.author !== username) {
                        callback(new MatchError('post author does not match user'))

                        return
                    }

                    data.posts.deleteOne({ _id: new ObjectId(postId) })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}


export default deletePost