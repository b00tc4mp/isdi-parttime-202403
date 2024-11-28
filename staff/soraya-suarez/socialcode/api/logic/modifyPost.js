import { User, Post } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const modifyPost = (userId, postId, title, image, description) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')
                    
                    if (post.author.toString() !== userId)
                        throw new MatchError('post author does not match user')

                    Post.updateOne({ _id: post._id },
                        { title: title }
                    )
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })
                    
                    Post.updateOne({ _id: post._id },
                        { image: image }
                    )
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })

                    return Post.updateOne({ _id: post._id },
                        { description: description }
                    )
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })
                })
        })
}

export default modifyPost