import validate from 'com/validate.js'
import { Activity, User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getActivity = (userId, activityId) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Activity.findById(activityId)
                .catch(error => { throw new SystemError(error.message) })
                .then(activity => {
                    if (!activity)
                        throw new NotFoundError('activity not found')

                    const activityObj = activity.toObject()
                    activityObj.id = activityObj._id
                    delete activityObj._id
                    return activityObj
                })
        })
}

export default getActivity