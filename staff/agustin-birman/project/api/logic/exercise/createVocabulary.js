import validate from "com/validate.js"
import { Activity, Exercise, User } from "../../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"
import { VocabularyExercise } from "../../data/Exercise.js"

const createVocabulary = (userId, activityId, word, answers) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')
    validate.text(word, 'word', 60)
    const filteredArray = answers.filter(element => element !== undefined && element !== null && element !== '');


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

                    return Exercise.countDocuments({ activity: activityId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(index => {

                            const newExercise = {
                                activity: activityId,
                                word,
                                answer: filteredArray,
                                index
                            }

                            return VocabularyExercise.create(newExercise)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })
                })
        })
}

export default createVocabulary