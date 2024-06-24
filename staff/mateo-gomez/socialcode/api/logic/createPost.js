import data from '../data/index.js'
import { ContentError, MatchError } from 'com/errors.js'
import validate from 'com/validate.js'

const USERNAME_REGEX = /^[\w-]+$/


const createPost = (username, title, image, description, callback) => {
    validate.username(username)
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'deescription', 300)
    validate.callback(callback)


    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        const post = {
            author: username,
            title,
            image,
            description,
            date: new Date().toISOString()
        }

        data.insertPost(post, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}

export default createPost