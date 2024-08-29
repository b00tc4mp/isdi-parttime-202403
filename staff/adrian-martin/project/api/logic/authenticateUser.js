import { User } from '../data/index.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'
import { CredentialError, NotFoundError, SystemError } from 'com/errors.js'

const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('User not found')


            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match)
                        throw new CredentialError('Wrong password')

                    return user._id.toString()
                })
        })
}

export default authenticateUser