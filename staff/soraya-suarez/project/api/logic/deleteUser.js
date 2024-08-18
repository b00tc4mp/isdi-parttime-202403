import { User } from '../data/index.js'
import { DuplicityError, CredentialsError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const modifyUserAvailable = (userId, userToDeleteId) => {
    validate.id(userId)
    validate.id(userToDeleteId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'admin') throw new CredentialsError('role not permited')

            return User.findById(userToDeleteId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(userToDelete => {
                    if (!userToDelete) throw new NotFoundError('user to delete not found')
                    
                    return User.deleteOne( { _id: userToDelete._id })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default modifyUserAvailable