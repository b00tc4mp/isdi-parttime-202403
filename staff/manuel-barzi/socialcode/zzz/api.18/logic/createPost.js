import data from '../data/index.js'
import { MatchError } from 'com/errors.js'
import validate from 'com/validate.js'

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

            const post = {
                author: username,
                title,
                image,
                description,
                date: new Date
            }

            data.posts.insertOne(post)
                .then(() => callback(null))
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}

export default createPost