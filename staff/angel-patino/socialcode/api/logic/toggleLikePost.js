import data from '../data.index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'
import { ObjectId } from 'mongodb'

function toggleLikePost(username, postId, callback) {
    validate.username(username)
    validate.id(postId, 'postId')
    validate.callback(callback)

    //si el usuario existe...
    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }
            //buscar el post(ObjectId)
            data.posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }
                    //para mirar si el usuario está
                    const index = post.likes.indexOf(username)
                    //indexOf devuelve 1 si está o 0 si no está
                    if (index < 0)
                        post.likes.push(username)
                    else
                        post.likes.splice(index, 1)
                    //indicamos el dato a meter
                    data.posts.updateOne({ _id: new ObjectId(postId) }, { $set: post })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost