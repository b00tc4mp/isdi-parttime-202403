import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'

function toggleLikePost(userId, postId, callback) {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
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

                    const included = post.likes.some(userObjectId => userObjectId.toString() === userId)

                    // const index = post.likes.indexOf(userId)

                    // if (index < 0)
                    //     post.likes.push(userId)
                    // else
                    //     post.likes.splice(index, 1)

                    // post.save()

                    Post.updateOne({ _id: post._id },
                        included ?
                            { $pull: { likes: user._id } }
                            :
                            { $push: { likes: user._id } }
                    )
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost