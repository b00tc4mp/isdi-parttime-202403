import validate from "com/validate.js"
import { User } from '../../data/index.js'
import { NotFoundError, SystemError } from "com/errors.js"

const removeTeacher = (userId, teacherId) => {
    validate.id(userId, 'userId')
    validate.id(teacherId, 'teacherId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return User.findById(teacherId)
                .catch(error => { throw new SystemError(error.message) })
                .then(teacher => {
                    if (!teacher) {
                        throw new NotFoundError('teacher not found')
                    }

                    return User.find({ _id: { $in: user.student } })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(user => {
                            if (!user) {
                                throw new NotFoundError('user not found')
                            }

                            const index = teacher.student.indexOf(userId)
                            if (index > -1) {
                                teacher.student.splice(index, 1)

                                return User.updateOne({ _id: teacher._id }, { student: teacher.student })
                                    .catch(error => { throw new SystemError(error.message) })
                                    .then(() => { })
                            } else {
                                throw new NotFoundError('Student is not in the teacher\'s student list')
                            }
                        })
                })
        })
}

export default removeTeacher
