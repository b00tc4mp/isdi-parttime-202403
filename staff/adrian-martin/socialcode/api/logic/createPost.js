import {User, Post} from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError } from 'com/error.js'



const createPost = (username, title, image, description, callback) => {
    validate.username(username)
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)
    validate.callback(callback)

    User.findOne({ username })
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
                likes: []
            }

            Post.create(post)
                .then(() => callback(null))
                .catch(error => callback(error))
        })
        .catch(error => console.error(error))

    // data.findUser(user => user.username === username, (error, user) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     if (!user) {
    //         callback(new MatchError('user not found'))

    //         return
    //     }

    //     const post = {
    //         author: username,
    //         title,
    //         image,
    //         description,
    //         date: new Date().toISOString()
    //     }

    //     data.insertPost(post, error => {
    //         if (error) {
    //             callback(error)

    //             return
    //         }

    //         callback(null)
    //     })
    // })

}

export default createPost