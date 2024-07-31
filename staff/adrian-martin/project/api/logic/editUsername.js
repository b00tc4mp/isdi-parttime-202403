import { User } from '../data/index.js'
import validate from '../../com/validate.js'
import { DuplicityError, NotFoundError, SystemError } from '../../com/errors.js'

const editUsername = (userId, username) => {
    validate.id(userId, 'userId')
    validate.username(username, 'username')

    // Buscamos al usuario por su ID en la base de datos

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            // Verificamos si el usuario existe

            if (!user) {
                throw new NotFoundError('User not found')
            }

            // Buscamos si el nuevo username esta en uso por otro usuario

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(existUsername => {

            // Verificamos si el username ya existe

            if (existUsername) {
                throw new DuplicityError('Username already exists')
            }

            // Actualizamos el username del usuario a la base de datos

            return User.findByIdAndUpdate(userId, { username: username }, { new: true })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(updateUsername => {

            // Verificamos si la actualizacion fue exitosa

            if (!updateUsername) {
                throw new SystemError('Failed to update username')
            }

            // Retornamos el usuario actualizado

            return updateUsername
        })
}

export default editUsername