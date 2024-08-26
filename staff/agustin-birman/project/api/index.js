import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    errorHandler,
    createActivityHandler,
    createCompleteSentenceExerciseHandler,
    getActivitiesHandler,
    getActivityHandler,
    deleteActivityHandler,
    getExercisesHandler,
    deleteExerciseHandler,
    editActivityHandler,
    editExerciseHandler,

    submitAnswerHandler,
    getAnswersHandler,
    deleteAnswersHandler,
    getUserInfoHandler,
    addStudentHandler,
    removeStudentHandler,
    getStudentsHandler,
    getTeachersActivitiesHandler,
    getTeachersHandler,
    checkCompleteActivityHandler,
    getExercisesCountHandler,
    getExerciseTypeHandler,
    getUserStatsHandler,
    createVocabularyHandler
} from './handlers/index.js'
import removeTeacherHandler from './handlers/removeTeacherHandler.js'
import createOrderSentenceHandler from './handlers/createOrderSentenceHandler.js'

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        // api.use(express.json())

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.get('/', (req, res) => res.send('Hello, World!'))

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId', getUserNameHandler)

        api.get('/users/:userId/info', getUserInfoHandler)

        api.get('/users/:userId/students', getStudentsHandler)

        api.patch('/users', jsonBodyParser, addStudentHandler)

        api.delete('/users/teacher/:studentId/', removeStudentHandler)

        api.delete('/users/student/:teacherId/', removeTeacherHandler)

        api.get('/users/:userId/teachers', getTeachersHandler)

        api.get('/users/student/:targetUserId/stats', getUserStatsHandler)

        api.post('/activity', jsonBodyParser, createActivityHandler)

        api.get('/activity', getActivitiesHandler)

        api.get('/activity/:activityId', getActivityHandler)

        api.get('/activity/:activityId/result', checkCompleteActivityHandler)

        api.get('/activity/:activityId/type', getExerciseTypeHandler)

        api.get('/activity/student/:userId', getTeachersActivitiesHandler)

        api.delete('/activity/:activityId', deleteActivityHandler)

        api.patch('/activity/:activityId', jsonBodyParser, editActivityHandler)

        api.post('/exercise/complete-sentence', jsonBodyParser, createCompleteSentenceExerciseHandler)

        api.post('/exercise/order-sentence', jsonBodyParser, createOrderSentenceHandler)

        api.post('/exercise/vocabulary', jsonBodyParser, createVocabularyHandler)

        api.get('/exercise/:activityId/count', getExercisesCountHandler)

        api.get('/exercise/:activityId', getExercisesHandler)

        api.delete('/exercise/:exerciseId', deleteExerciseHandler)

        api.patch('/exercise/:exerciseId', jsonBodyParser, editExerciseHandler)

        api.post('/answer', jsonBodyParser, submitAnswerHandler)

        api.get('/answer/:exerciseId', getAnswersHandler)

        api.delete('/answer/:activityId', deleteAnswersHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API is running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))
