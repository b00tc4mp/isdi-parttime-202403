import { MatchError, SystemError } from "com/errors.js"
import { User, Post } from "../data/models/index.js"
import validate from "com/validate.js"

const createPostComment = (userId, postId, comment, callback) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 150)
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

                    Post.findByIdAndUpdate((postId), {
                        $push: {
                            comment: {
                                author: userId,
                                text: comment,
                                date: new Date()
                            }


                        }
                    })
                        .then(() => callback(null))
                        .catch(error => { throw new SystemError(error.message) })
                })
                .catch(error => { throw new SystemError(error.message) })
        })
        .catch(error => { throw new SystemError(error.message) })

}

export default createPostComment