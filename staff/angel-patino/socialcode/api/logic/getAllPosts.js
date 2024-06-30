import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPosts = (username, callback) => {
    validate.username(username)
    validate.callbakc(callback)
    //encuentrame los posts de este usuario (username)
    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }
            //devuelveme todos los posts
            data.posts.find({}).toArray()
                .then(posts => {
                    //borrar _id, para sanear la logia de mongo. asi convertimos a string, para que la app lo reconozca.
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post._id

                    })
                        (callback(null, posts))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getAllPosts