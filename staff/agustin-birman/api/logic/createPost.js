import validate from 'com/validate.js'
import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'

const createPost = (username, title, image, description, callback) => {
    validate.username(username)
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            const newPost = {
                author: username,
                title,
                image,
                description,
                date: new Date,
                likes: [],
                comments: []
            }

            data.posts.insertOne(newPost)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}
export default createPost