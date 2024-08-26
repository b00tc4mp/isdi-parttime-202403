import registerUser from './registerUser'
import loginUser from './loginUser'
import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'
import getUserInfo from './getUserInfo'
import addStudent from './addStudent'
import removeStudent from './removeStudent'
import getStudents from './getStudents'
import getUserRole from './getUserRole'
import getTeachers from './getTeachers'
import removeTeacher from './removeTeacher'
import getUserId from './getUserId'
import getUserStats from './getUserStats'

import createActivity from './createActivity'
import getActivities from './getActivities'
import getActivity from './getActivity'
import deleteActivity from './deleteActivity'
import editActivity from './editActivity'
import getTeachersActivities from './getTeachersActivities'
import checkCompleteActivity from './checkCompleteActivity'

import createCompleteSentenceExercise from './createCompleteSentenceExercise'
import createOrderSentence from './createOrderSentence'
import createVocabulary from './createVocabulary'
import getExercises from './getExercises'
import deleteExercise from './deleteExercise'
import editExercise from './editExercise'
import getExercisesCount from './getExercisesCount'
import getExerciseType from './getExerciseType'

import submitAnswer from './submitAnswer'
import getAnswers from './getAnswers'
import deleteAnswers from './deleteAnswers'


const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    logoutUser,
    getUserInfo,
    addStudent,
    removeStudent,
    getStudents,
    getUserRole,
    getTeachers,
    removeTeacher,
    getUserId,
    getUserStats,

    createActivity,
    getActivities,
    getActivity,
    deleteActivity,
    editActivity,
    getTeachersActivities,
    checkCompleteActivity,

    createCompleteSentenceExercise,
    createOrderSentence,
    createVocabulary,
    getExercises,
    deleteExercise,
    editExercise,
    getExercisesCount,
    getExerciseType,

    submitAnswer,
    getAnswers,
    deleteAnswers
}

export default logic