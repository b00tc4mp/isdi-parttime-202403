import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'

function toggleLikePost(userId, postId, callback) {
  // Validación de los IDs y el callback
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.callback(callback)

  // Buscar al usuario por su ID
  User.findById(userId).lean()
    .then(user => {
      // Verificar si el usuario no existe
      if (!user) {
        callback(new MatchError('user not found'))
        return
      }

      // Buscar el post por su ID
      Post.findById(postId)
        .then(post => {
          // Verificar si el post no existe
          if (!post) {
            callback(new MatchError('post not found'))
            return
          }

          // Verificar si el usuario ya dio like en el post
          const included = post.liked.some(userObjectId => userObjectId.toString() === userId)

          // Crear el objeto de actualización según si el usuario ya está incluido o no
          const update = included ?
            { $pull: { liked: user._id } }  // Eliminar el like
            :
            { $push: { liked: user._id } }  // Agregar el like

          // Actualizar el post con la operación correspondiente
          Post.updateOne({ _id: post._id }, update)
            .then(() => callback(null))
            .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost