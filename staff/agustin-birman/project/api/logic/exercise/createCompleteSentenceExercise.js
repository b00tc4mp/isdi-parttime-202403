import validate from 'com/validate.js'
import { Activity, Exercise, User } from '../../data/index.js'
import { CompleteSentenceExercise } from '../../data/Exercise.js';
import { NotFoundError, SystemError } from 'com/errors.js'

const ANSWER_REGEX = /\(([^)]+)\)/;

const createCompleteSentenceExercise = (userId, activityId, sentence) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')
    validate.textCompleteSentence(sentence, 'sentence', 200)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')


            return Activity.findById(activityId)
                .catch(error => { throw new SystemError(error.message) })
                .then(activities => {
                    if (!activities)
                        throw new NotFoundError('activity not found')

                    const removeAnswer = sentence.match(ANSWER_REGEX)

                    return Exercise.countDocuments({ activity: activityId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(index => {

                            const newExercise = {
                                activity: activityId,
                                sentence,
                                answer: removeAnswer[1],
                                index
                            }

                            return CompleteSentenceExercise.create(newExercise)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })


                })
        })

}

export default createCompleteSentenceExercise