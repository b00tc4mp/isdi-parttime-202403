import { User } from '../data/index.js'
import { SystemError, NotFoundError } from 'com/errors.js'

const getAllUsers = () => {

    return User.find({}).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            if (!users.length)
                throw new NotFoundError('User not found')

            users.forEach(user => {
                user.id = user._id.toString()
                delete user._id
            })

            return users
        })
}

export default getAllUsers