import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const getAllUsers = () => {

    return User.find({}).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            return users
        })
}

export default getAllUsers