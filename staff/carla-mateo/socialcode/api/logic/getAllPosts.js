import validate from 'com/validate.js'
import { User, Post } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getAllPosts = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError('server error') })
        .then(user => {
            if (!user) throw new NotFoundError('❌user not found')

            return Post.find({}).populate('author', 'username').select('-__v').populate('comments.author', 'username').sort({ date: -1 }).lean()
                .catch(() => { throw new SystemError('server error') })
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()

                            delete post.author._id
                        }

                        post.likes = post.likes.map(userObjectId => userObjectId.toString())

                        post.comments.forEach(comment => {
                            if (comment.author._id) {
                                comment.id = comment._id.toString()

                                delete comment._id
                            }

                        })
                    })

                    return posts
                })

        })

}

export default getAllPosts