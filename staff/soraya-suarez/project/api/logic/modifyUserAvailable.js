import { User } from '../data/index.js'
import { DuplicityError, CredentialsError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const modifyUserAvailable = (userId, userToModifyId, available) => {
    validate.id(userId)
    validate.id(userToModifyId)
    validate.boolean(available)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'admin') throw new CredentialsError('role not permited')

            return User.findById(userToModifyId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(userToModify => {
                    if (!userToModify) throw new NotFoundError('user not found')
                    
                    return User.updateOne( { _id: userToModify._id }, { available })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default modifyUserAvailable