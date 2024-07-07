import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { User, Post } from '../data/models/index.js'

function toggleLike(userId, postId, callback) {
    validate.username(userId, "userId")
    validate.id(postId, "postId")
    validate.callback(callback)


    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            Post.findById((postId))
                .then(post => {

                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    const userIndex = post.liked.indexOf(userId)

                    if (userIndex < 0) {
                        post.liked.push(userId)
                    } else {
                        post.liked.splice(userIndex, 1)
                    }

                    post.save()
                        .then(() => {
                            if (userIndex === -1) {
                                callback(null, true)
                            } else {
                                callback(null)
                            }
                        })
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLike