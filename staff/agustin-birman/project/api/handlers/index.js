import registerUserHandler from './registerUserHandler.js'
import authenticateUserHandler from './authenticateUserHandler.js'
import getUserNameHandler from './getUserNameHandler.js'
import getUserInfoHandler from './getUserInfoHandler.js'
import addStudentHandler from './addStudentHandler.js'
import removeStudentHandler from './removeStudentHandler.js'
import removeTeacherHandler from './removeTeacherHandler.js'
import getStudentsHandler from './getStudentsHandler.js'
import getTeachersHandler from './getTeachersHandler.js'
import getUserStatsHandler from './getUserStatsHandler.js'

import errorHandler from './errorHandler.js'

import createActivityHandler from './createActivityHandler.js'
import getActivitiesHandler from './getActivitiesHandler.js'
import getTeachersActivitiesHandler from './getTeachersActivitiesHandler.js'
import getActivityHandler from './getActivityHandler.js'
import deleteActivityHandler from './deleteActivityHandler.js'
import editActivityHandler from './editActivityHandler.js'
import checkCompleteActivityHandler from './checkCompleteActivityHandler.js'

import createCompleteSentenceExerciseHandler from './createCompleteSentenceExerciseHandler.js'
import createVocabularyHandler from './createVocabularyHandler.js'
import createOrderSentenceHandler from './createOrderSentenceHandler.js'
import getExercisesHandler from './getExercisesHandler.js'
import deleteExerciseHandler from './deleteExerciseHandler.js'
import editExerciseHandler from './editExerciseHandler.js'
import getExercisesCountHandler from './getExercisesCountHandler.js'
import getExerciseTypeHandler from './getExerciseTypeHandler.js'

import submitAnswerHandler from './submitAnswerHandler.js'
import getAnswersHandler from './getAnswersHandler.js'
import deleteAnswersHandler from './deleteAnswersHandler.js'

export {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    getUserInfoHandler,
    addStudentHandler,
    removeStudentHandler,
    removeTeacherHandler,
    getStudentsHandler,
    getTeachersHandler,
    getUserStatsHandler,

    errorHandler,

    createActivityHandler,
    getActivitiesHandler,
    getActivityHandler,
    deleteActivityHandler,
    editActivityHandler,
    getTeachersActivitiesHandler,
    checkCompleteActivityHandler,

    createCompleteSentenceExerciseHandler,
    createOrderSentenceHandler,
    createVocabularyHandler,
    getExercisesHandler,
    deleteExerciseHandler,
    editExerciseHandler,
    getExercisesCountHandler,
    getExerciseTypeHandler,

    submitAnswerHandler,
    getAnswersHandler,
    deleteAnswersHandler
}