import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'



const createPost = (username, title, image, description, callback) => {
    validate.username(username)
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 300)
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
                date: new Date,
                likes: 0,
                liked: []
            }
            data.posts.insertOne(post)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))

    //antes de Mongo
    /*data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new SystemError(error.message))

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
            date: new Date().toISOString(),
            likes: 0,
            liked: []
        }

        data.insertPost(post, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null)
        })
    })*/
}

export default createPost