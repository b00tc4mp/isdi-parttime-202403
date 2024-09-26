import validate from 'com/validate.js'
import { Activity, User, Answer, Exercise } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const checkCompleteActivity = (userId, activityId) => {
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
                        .then(exerciseCount => {

                            return Answer.countDocuments({ student: userId, activity: activityId })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(answerCount => {
                                    return exerciseCount === answerCount
                                })
                        })
                })
        })
}

export default checkCompleteActivity