import { User } from '../data/models/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'



const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('User not found')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match)
                        throw new MatchError('wrong password')

                    return user._id.toString()

                })

        })

}


export default authenticateUser

