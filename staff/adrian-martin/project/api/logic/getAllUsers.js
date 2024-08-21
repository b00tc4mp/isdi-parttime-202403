import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const getAllUsers = () => {

    return User.find({}).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            users.forEach(user => {
                user.id = user._id.toString()
                delete user._id
            })

            return users
        })
}

export default getAllUsers