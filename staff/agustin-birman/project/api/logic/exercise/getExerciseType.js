import validate from 'com/validate.js'
import { Activity, Exercise, User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'



const getExerciseType = (userId, activityId) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Activity.findById(activityId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(activity => {
                    if (!activity)
                        throw new NotFoundError('activity not found')

                    return Exercise.findOne({ activity: activityId }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(exercise => {
                            return exercise.type

                        })
                })
        })
}


export default getExerciseType

