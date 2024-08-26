import { Activity, Exercise, User } from "../../data/index.js"
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getExercisesCount = (userId, activityId) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Activity.findById(activityId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(activity => {
                    if (!activity) throw new NotFoundError('activity not found')

                    return Exercise.countDocuments({ activity: activityId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(count => count)
                })
        })
}

export default getExercisesCount
