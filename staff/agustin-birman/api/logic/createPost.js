import validate from 'com/validate.js'
import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'

const createPost = (userId, title, image, description, callback) => {
    validate.id(userId, 'userId')
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            const newPost = {
                author: userId,
                title,
                image,
                description,
                date: new Date,
                likes: [],
                comments: []
            }

            Post.create(newPost)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}
export default createPost