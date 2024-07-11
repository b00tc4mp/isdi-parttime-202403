import { User, Post } from '../data/models/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'



const createPost = (userId, title, image, description) => {
    validate.id(userId)
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 300)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new MatchError('user not found')

            }
            const post = {
                author: userId,
                title,
                image,
                description,
                date: new Date,
                comment: [],
                liked: []
            }
            return Post.create(post)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })

        })


}

export default createPost