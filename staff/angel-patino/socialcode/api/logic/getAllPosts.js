import { User, Post } from '../data/models/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPosts = (userId, callback) => {
    validate.id(userId, 'userId')
    validate.callback(callback)
    //encuentrame los posts de este usuario (username)
    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }
            //devuelveme todos los posts
            //lean() devuelve el documento que viene da la bd
            Post.find({}).populate('author', 'username').select('-__v').sort({ date: -1 }).lean()
                .then(posts => {
                    //borrar _id, para sanear la logia de mongo. asi convertimos a string, para que la app lo reconozca.
                    posts.forEach((post) => {
                        post.id = post._id.toString()

                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()

                            delete post.author._id
                        }

                        post.likes = post.likes.map(userObjectId => userObjectId.toString())

                    })
                        (callback(null, posts))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getAllPosts