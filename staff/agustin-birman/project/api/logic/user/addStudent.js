import { DuplicityError, NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { User } from '../../data/index.js'

const addStudent = (userId, studentId) => {
    validate.id(userId, 'userId')
    validate.id(studentId, 'studentId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.findById(studentId)
                .catch(error => { throw new SystemError(error.message) })
                .then(student => {
                    if (!student)
                        throw new NotFoundError('student not found')

                    if (user.student.includes(studentId))
                        throw new DuplicityError('student already exists for this user')

                    user.student.push(studentId)

                    return User.updateOne({ _id: user._id }, { student: user.student })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default addStudent