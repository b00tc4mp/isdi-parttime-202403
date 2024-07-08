import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createPost = (userId, title, image, description, callback) => {
    validate.id(userId)
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)
    validate.callback(callback)

    data.users.findById({ userId })
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
                date: new Date().toLocaleDateString(),
                likes: [],
                comments: []
            }

            data.posts.insertOne(post)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })

        .catch(error => callback(new SystemError(error.message)))

}

export default createPost