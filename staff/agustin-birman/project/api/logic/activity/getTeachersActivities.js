import validate from 'com/validate.js'
import { Activity, User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getTeachersActivities = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return User.find({ student: userId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(teachers => {

                    const teacherIds = teachers.map(teacher => teacher._id)

                    return Activity.find({ teacher: { $in: teacherIds } }).select('-__v')
                        .populate({ path: 'teacher', select: 'username' })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(activities => {

                            const transformedActivities = activities.map(activity => {
                                const activityObj = activity.toObject()
                                activityObj.id = activityObj._id
                                delete activityObj._id

                                if (activityObj.teacher) {
                                    activityObj.teacherUsername = activityObj.teacher.username
                                    activityObj.teacher.id = activityObj.teacher._id
                                    delete activityObj.teacher._id
                                }

                                return activityObj
                            })
                            return transformedActivities
                        })
                })
        })
}

export default getTeachersActivities
