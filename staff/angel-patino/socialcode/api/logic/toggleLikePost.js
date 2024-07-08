import { User, Post } from '../data/models/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'
import { ObjectId } from 'mongodb'

function toggleLikePost(userId, postId, callback) {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.callback(callback)

    //si el usuario existe...
    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }
            //buscar el post(ObjectId)
            Post.findById(postId)
                .then(post => {
                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }
                    //para mirar si el usuario está
                    const index = post.likes.indexOf(userId)
                    //indexOf devuelve 1 si está o 0 si no está
                    if (index < 0)
                        post.likes.push(userId)
                    else
                        post.likes.splice(index, 1)
                    //indicamos el dato a meter
                    post.save()
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost