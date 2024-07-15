import { User, Post } from '../data/models/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllPosts = (userId) => {
    validate.id(userId, 'userId')
    //encuentrame los posts de este usuario (username)
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            //devuelveme todos los posts
            //lean() devuelve el documento que viene da la bd
            return Post.find({}).populate('author', 'username').select('-__v').sort({ date: -1 }).lean()
                .catch((error) => { throw new SystemError(error.message) })
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
                    return posts

                })
        })
}
export default getAllPosts