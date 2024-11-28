import { User, Post } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPosts = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.find({}).populate('author', 'username').select('-__v').sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        if (post.author._id) {
                            // { _id, username }
                            post.author.id = post.author._id.toString()

                            delete post.author._id
                        }

                        post.likes = post.likes.map(userObjectId => userObjectId.toString())
                    })

                    return posts
                })
        })
}

export default getAllPosts