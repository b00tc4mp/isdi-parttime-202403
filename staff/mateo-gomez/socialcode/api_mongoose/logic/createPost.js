import { User, Post } from '../data/models/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'



const createPost = (userId, title, image, description, callback) => {
    validate.id(userId)
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 300)
    validate.callback(callback)


    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            const post = {
                author: userId,
                title,
                image,
                description,
                date: new Date,
                liked: []
            }
            Post.create(post)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))


}

export default createPost