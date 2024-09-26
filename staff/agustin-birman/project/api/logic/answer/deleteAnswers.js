import validate from 'com/validate.js'
import { Activity, Answer, Exercise, User } from '../../data/index.js'
import { CredentialsError, NotFoundError, SystemError } from 'com/errors.js'

const deleteAnswers = (userId, activityId) => {
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

                    return Exercise.find({ activity: activityId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(exercises => {
                            if (!exercises || exercises.length === 0)
                                throw new NotFoundError('exercise not found')

                            const exerciseIds = exercises.map(exercise => exercise._id)

                            return Answer.find({ exercise: exerciseIds })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(answers => {
                                    if (!answers || answers.length === 0)
                                        throw new NotFoundError('answer not found')

                                    const unauthorizedAnswer = answers.find(answer => userId !== answer.student.toString())
                                    if (unauthorizedAnswer)
                                        throw new CredentialsError('you cannot delete this answer')

                                    return Answer.deleteMany({ exercise: { $in: exerciseIds } })
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(() => { })
                                })
                        })
                })
        })
}

export default deleteAnswers