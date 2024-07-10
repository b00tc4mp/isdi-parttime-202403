import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new MatchError('post not found')



                    if (post.author.toString() !== userId)
                        throw new MatchError('post author does not match user')


                    return Post.deleteOne({ _id: new ObjectId(postId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })

        })
}

export default deletePost