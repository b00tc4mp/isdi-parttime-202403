import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError } from 'com/error.js'



const createPost = (userId, title, image, description) => {
    validate.id(userId, 'userId')
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError("connection error") })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            const post = {
                author: userId,
                title,
                image,
                description,
                date: new Date,
                likes: []
            }

            return Post.create(post)
                .catch(() => { throw new SystemError("connection error") })
                .then(() => { })
        })
}

export default createPost