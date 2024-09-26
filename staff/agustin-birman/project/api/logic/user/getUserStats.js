import validate from 'com/validate.js'
import { Activity, Answer, Exercise, User } from '../../data/index.js'
import { SystemError, NotFoundError } from 'com/errors.js'

const getUserStats = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user)
                        throw new NotFoundError('targetUser not found')

                    return Answer.find({ student: targetUserId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(answers => {
                            const exerciseIds = answers.map(answer => answer.exercise)

                            return Exercise.find({ _id: { $in: exerciseIds } })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(exercises => {

                                    let countCorrectExercises = 0
                                    exercises.forEach(exercise => {
                                        answers.forEach(answer => {
                                            if (answer.exercise.toString() === exercise._id.toString()) {
                                                switch (exercise.type) {
                                                    case 'completeSentence':
                                                        if (answer.answer === exercise.answer) {
                                                            countCorrectExercises += 1
                                                        }
                                                        break
                                                    case 'orderSentence':
                                                        if (answer.answer === exercise.sentence) {
                                                            countCorrectExercises += 1
                                                        }
                                                        break
                                                    case 'vocabulary':
                                                        if (exercise.answer.includes(answer.answer)) {
                                                            countCorrectExercises += 1
                                                        }
                                                        break
                                                }
                                            }
                                        })
                                    })

                                    const activityIds = exercises.map(exercise => exercise.activity)
                                    return Activity.countDocuments({ _id: { $in: activityIds } })
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(countActivities => {

                                            return { countActivities, countExercises: exercises.length, countCorrectExercises }
                                        })

                                })
                        })
                })
        })
}
export default getUserStats