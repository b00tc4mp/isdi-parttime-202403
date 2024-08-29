import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

function toggleLikePost(userId, postId) {
  // Validación de los IDs y el callback
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')

  // Buscar al usuario por su ID
  return User.findById(userId).lean()
    .catch((error) => { throw new SystemError(error.message) })
    .then(user => {
      // Verificar si el usuario no existe
      if (!user) {
        throw new NotFoundError('❌ User not found ❌')
      }

      // Buscar el post por su ID
      return Post.findById(postId)
        .catch((error) => { throw new SystemError(error.message) })
        .then(post => {
          // Verificar si el post no existe
          if (!post) {
            throw new NotFoundError('❌ Post not found ❌')
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
            .catch((error) => { throw new SystemError(error.message) })
            .then(() => { return !included })
        })
    })
}

export default toggleLikePost