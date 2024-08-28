import validate from 'com/validate.js'
import { User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const removeStudent = (userId, studentId) => {
    validate.id(userId, 'userId')
    validate.id(studentId, 'studentId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            const index = user.student.indexOf(studentId)
            if (index > -1) {
                user.student.splice(index, 1)

                return User.updateOne({ _id: user._id }, { student: user.student })
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })
            } else {
                throw new NotFoundError('student is not in your list')
            }
        })
}

export default removeStudent
