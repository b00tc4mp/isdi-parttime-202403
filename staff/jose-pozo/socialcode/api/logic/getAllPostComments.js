import { User, Post } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPostComments = (userId, postId) => {
    validate.id(userId)
    validate.id(postId, 'postId')

    return User.findOne(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) {
                        { throw new NotFoundError('post not found') }
                    }

                    const comments = post.comments.reverse()

                    return comments
                })
        })
}

export default getAllPostComments