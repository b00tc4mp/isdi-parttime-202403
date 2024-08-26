import registerUser from './user/registerUser.js'
import authenticateUser from './user/authenticateUser.js'
import getUserName from './user/getUserName.js'
import getUserInfo from './user/getUserInfo.js'
import addStudent from './user/addStudent.js'
import removeStudent from './user/removeStudent.js'
import getTeachers from './user/getTeachers.js'
import removeTeacher from './user/removeTeacher.js'
import getStudents from './user/getStudents.js'

import createActivity from './activity/createActivity.js'
import getActivities from './activity/getActivities.js'
import getActivity from './activity/getActivity.js'
import deleteActivity from './activity/deleteActivity.js'
import editActivity from './activity/editActivity.js'
import checkCompleteActivity from './activity/checkCompleteActivity.js'
import getTeachersActivities from './activity/getTeachersActivities.js'

import createCompleteSentenceExercise from './exercise/createCompleteSentenceExercise.js'
import getExercises from './exercise/getExercises.js'
import deleteExercise from './exercise/deleteExercise.js'
import editExercise from './exercise/editExercise.js'
import getExercisesCount from './exercise/getExercisesCount.js'
import createOrderSentence from './exercise/createOrderSentence.js'
import getExerciseType from './exercise/getExerciseType.js'
import createVocabulary from './exercise/createVocabulary.js'

import submitAnswer from './answer/submitAnswer.js'
import getAnswers from './answer/getAnswers.js'
import deleteAnswers from './answer/deleteAnswers.js'
import getUserStats from './user/getUserStats.js'


const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getUserInfo,
    addStudent,
    removeStudent,
    getStudents,
    removeTeacher,
    getUserStats,

    createActivity,
    getActivities,
    getActivity,
    editActivity,
    deleteActivity,
    getTeachersActivities,
    getTeachers,
    checkCompleteActivity,

    createCompleteSentenceExercise,
    getExercises,
    deleteExercise,
    editExercise,
    getExercisesCount,
    createOrderSentence,
    createVocabulary,
    getExerciseType,

    submitAnswer,
    getAnswers,
    deleteAnswers
}

export default logic