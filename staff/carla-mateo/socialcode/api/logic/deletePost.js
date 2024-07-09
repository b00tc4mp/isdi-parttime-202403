import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types


const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError('server error') })
        .then(user => {
            if (!user) throw new MatchError('❌user not found')


            return Post.findById(postId).lean()
                .catch(() => { throw new SystemError('server error') })
                .then(post => {
                    if (!post) throw new MatchError('❌post not found')

                    if (post.author.toString() !== userId)
                        throw new MatchError('❌post author does not match user')

                    return Post.deleteOne({ _id: new ObjectId(postId) })
                        .then(() => postId)
                        .catch(error => callback(new SystemError(error.message)))
                })

        })

}

export default deletePost
