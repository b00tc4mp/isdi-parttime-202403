import validate from 'com/validate.js'
import { User, Post } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const createPost = (userId, title, image, description) => {
    validate.id(userId, 'userId')
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            const newPost = {
                author: userId,
                title,
                image,
                description,
                date: new Date,
                likes: [],
                comments: []
            }

            return Post.create(newPost)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })

        })
}
export default createPost