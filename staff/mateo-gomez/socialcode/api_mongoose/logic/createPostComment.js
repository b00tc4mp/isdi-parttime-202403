import { NotFoundError, SystemError } from "com/errors.js"
import { User, Post } from "../data/models/index.js"
import validate from "com/validate.js"

const createPostComment = (userId, postId, comment) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 150)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')

            }

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) {
                        throw new NotFoundError('post not found')

                    }

                    return Post.findByIdAndUpdate((postId), {
                        $push: {
                            comment: {
                                author: userId,
                                text: comment,
                                date: new Date()
                            }


                        }
                    })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })


}

export default createPostComment