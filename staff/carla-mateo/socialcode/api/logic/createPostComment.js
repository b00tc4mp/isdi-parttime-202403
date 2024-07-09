import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'

const createPostComment = (userId, postId, comment) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 100)

    return User.findById(userId)
        .catch(() => { throw new SystemError('server error') })
        .then(user => {
            if (!user) throw new MatchError('❌ User not found')


            return Post.findById(postId)
                .catch(() => { throw new SystemError('server error') })
                .then(post => {
                    if (!post)
                        throw new MatchError('❌ Post not found')

                    return Post.findByIdAndUpdate((postId), { $push: { comments: { author: userId, date: new Date, comment: comment } } })
                        .then(() => { return })
                        .catch(() => { throw new SystemError('server error') })
                })


        })




}

export default createPostComment