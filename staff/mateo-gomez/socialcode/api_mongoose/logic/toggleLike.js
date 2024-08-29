import { NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { User, Post } from '../data/models/index.js'

function toggleLike(userId, postId) {
    validate.username(userId, "userId")
    validate.id(postId, "postId")


    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')

            }

            return Post.findById((postId))
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {

                    if (!post) {
                        throw new NotFoundError('post not found')

                    }

                    // Verificar si el usuario ya dio like en el post
                    const included = post.liked.some(userObjectId => userObjectId.toString() === userId)

                    // Crear el objeto de actualización según si el usuario ya está incluido o no
                    const update = included ?
                        { $pull: { liked: user._id } }  // Eliminar el like
                        :
                        { $push: { liked: user._id } }  // Agregar el like

                    // Actualizar el post con la operación correspondiente
                    return Post.updateOne({ _id: post._id }, update)
                        .catch(() => { throw new SystemError("connection error") })
                        .then(() => { return !included })
                })

        })
}

export default toggleLike