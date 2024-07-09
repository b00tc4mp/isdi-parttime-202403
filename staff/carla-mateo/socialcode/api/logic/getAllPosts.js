import validate from 'com/validate.js'
import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'

const getAllPosts = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError('server error') })
        .then(user => {
            if (!user) throw new MatchError('❌user not found')

            return Post.find({}).populate('author', 'username').select('-__v').sort({ date: -1 }).lean()
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
                    })

                    return posts
                })

        })

}

export default getAllPosts