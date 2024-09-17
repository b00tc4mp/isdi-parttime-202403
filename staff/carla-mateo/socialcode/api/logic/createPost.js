import { User, Post } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createPost = (userId, title, image, description) => {
    validate.id(userId, 'userId')
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError('server error') })
        .then(user => {
            if (!user) throw new NotFoundError('❌ User not found')

            const post = {
                author: userId,
                title,
                image,
                description,
                date: new Date,
                comments: [],
                likes: []
            }

            return Post.create(post)
                .catch(() => { throw new SystemError('server error') })
                .then(() => { })
        })

}

export default createPost