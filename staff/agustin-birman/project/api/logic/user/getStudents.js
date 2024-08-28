import validate from 'com/validate.js'
import { User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getStudents = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).populate('student').exec()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.find({ _id: { $in: user.student } }).select('-__v')
                .catch(error => { throw new SystemError(error.message) })
                .then(students => {
                    return students.map(student => {
                        const studentObj = student.toObject()
                        studentObj.id = studentObj._id
                        delete studentObj._id
                        return studentObj
                    })
                })
        })
}

export default getStudents
