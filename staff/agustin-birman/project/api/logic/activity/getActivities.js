import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Activity, User } from '../../data/index.js'

const getActivities = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Activity.find({ teacher: userId })
                .catch(error => { throw new SystemError(error.message) })
                .then(activities => {
                    const transformedActivities = activities.map(activity => {
                        const activityObj = activity.toObject()
                        activityObj.id = activityObj._id
                        delete activityObj._id
                        return activityObj
                    })
                    return transformedActivities
                })
        })
}

export default getActivities