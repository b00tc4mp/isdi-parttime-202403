import { User } from '../data/index.js'
import { NotFoundError, SystemError, CredentialsError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const modifyMyPassword = (userId, oldPassword, password, passwordRepeat) => {
    validate.id(userId)
    validate.password(oldPassword)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return bcrypt.compare(oldPassword, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match)
                        throw new CredentialsError('wrong password')

                    return bcrypt.hash(password, 8)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(hash => {

                            const update = { password: hash }

                            return User.updateOne( { _id: user._id }, update)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })
                    
                })
        })
}

export default modifyMyPassword