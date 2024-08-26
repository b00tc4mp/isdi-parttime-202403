import validate from 'com/validate.js'
import { Exercise, User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import { Types } from 'mongoose'
import { CompleteSentenceExercise, OrderSentenceExercise, VocabularyExercise } from '../../data/Exercise.js'

const { ObjectId } = Types

const ANSWER_REGEX = /\(([^)]+)\)/;

const editExercise = (userId, exerciseId, updateData = {}) => {
    validate.id(userId, 'userId')
    validate.id(exerciseId, 'exerciseId')


    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Exercise.findById(exerciseId)
                .catch(error => { throw new SystemError(error.message) })
                .then(exercise => {
                    if (!exercise)
                        throw new NotFoundError('exercise not found')

                    const exerciseType = exercise.type

                    const update = {}

                    switch (exerciseType) {
                        case 'completeSentence':
                            if (updateData.sentence !== undefined) {
                                validate.textCompleteSentence(updateData.sentence, 'sentence', 50)
                                const removeAnswer = updateData.sentence.match(ANSWER_REGEX)

                                update.sentence = updateData.sentence
                                update.answer = removeAnswer[1]

                                return CompleteSentenceExercise.updateOne({ _id: exerciseId }, { $set: update })
                                //TODO catch and then
                            }
                        case 'orderSentence':
                            if (updateData.sentence !== undefined) {
                                validate.text(updateData.sentence, 'sentence', 50)
                                update.sentence = updateData.sentence
                            }

                            if (updateData.translate !== undefined) {
                                validate.text(updateData.translate, 'translate', 50)
                                update.translate = updateData.translate
                            }

                            return OrderSentenceExercise.updateOne({ _id: exerciseId }, { $set: update })

                        case 'vocabulary':
                            if (updateData.word !== undefined) {
                                validate.text(updateData.word, 'word', 50)
                                update.word = updateData.word
                            }

                            if (updateData.answers !== undefined) {
                                validate.text(updateData.answers, 'word', 50)
                                update.answer = updateData.answers
                            }

                            return VocabularyExercise.updateOne({ _id: exerciseId }, { $set: update })
                    }
                })
        })
}

export default editExercise

