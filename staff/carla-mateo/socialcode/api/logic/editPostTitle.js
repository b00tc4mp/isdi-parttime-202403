import validate from "com/validate.js"
import { User, Post } from '../data/index.js'
import { MatchError, NotFoundError, SystemError } from 'com/errors.js'

const editPostTitle = (userId, postId, title) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(title, 'title', 30)

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError('server error') })
        .then(user => {
            if (!user) throw new NotFoundError('❌user not found')

            return Post.findById(postId).lean()
                .catch(() => { throw new SystemError('server error') })
                .then(post => {
                    if (!post) throw new NotFoundError('❌post not found')

                    if (post.author.toString() !== userId)
                        throw new MatchError('❌post author does not match user')

                    return Post.findByIdAndUpdate(postId, { title: title }, { new: true })
                        .catch(() => { throw new SystemError('server error') })
                        .then(() => { })
                })
        })
}

export default editPostTitle