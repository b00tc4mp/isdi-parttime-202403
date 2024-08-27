import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const modifyUser = (userId, name, surname, email, phone, avatar, password, passwordRepeat) => {
    validate.id(userId)
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phone(phone)
    validate.url(avatar)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const update = { name, surname, email, phone, avatar, password: hash }

                    return User.updateOne( { _id: user._id }, update)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default modifyUser