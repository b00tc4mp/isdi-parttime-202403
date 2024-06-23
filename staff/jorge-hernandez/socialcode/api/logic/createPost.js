import data from '../data/index.js'
import { MatchError } from 'com/errors.js'

const createPost = (username, title, image, description, callback) => {
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
            date: new Date().toDateString()
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