import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, MatchError, SystemError } from 'com/errors.js'

function toggleLikePost(userId, postId) {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found 😭')

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found 😵‍💫')

                    const included = post.likes.some(userObjectId => userObjectId.toString() === userId)

                    return Post.updateOne({ _id: post._id },
                        included ?
                            { $pull: { likes: user._id } }
                            :
                            { $push: { likes: user._id } }
                    )
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default toggleLikePost