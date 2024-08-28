import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import {
    errorHandler,

    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    getUserInfoHandler,
    addStudentHandler,
    removeStudentHandler,
    getStudentsHandler,
    getTeachersHandler,
    getUserStatsHandler,
    removeTeacherHandler,

    createActivityHandler,
    getActivitiesHandler,
    getActivityHandler,
    deleteActivityHandler,
    editActivityHandler,
    getTeachersActivitiesHandler,
    checkCompleteActivityHandler,

    createCompleteSentenceExerciseHandler,
    createVocabularyHandler,
    createOrderSentenceHandler,
    getExercisesHandler,
    getExercisesCountHandler,
    getExerciseTypeHandler,
    deleteExerciseHandler,
    editExerciseHandler,

    submitAnswerHandler,
    getAnswersHandler,
    deleteAnswersHandler,
} from './handlers/index.js'

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

        api.post('/activities', jsonBodyParser, createActivityHandler)

        api.get('/activities', getActivitiesHandler)

        api.get('/activities/:activityId', getActivityHandler)

        api.get('/activities/:activityId/result', checkCompleteActivityHandler)

        api.get('/activities/:activityId/type', getExerciseTypeHandler)

        api.get('/activities/student/:userId', getTeachersActivitiesHandler)

        api.delete('/activities/:activityId', deleteActivityHandler)

        api.patch('/activities/:activityId', jsonBodyParser, editActivityHandler)

        api.post('/exercises/complete-sentence', jsonBodyParser, createCompleteSentenceExerciseHandler)

        api.post('/exercises/order-sentence', jsonBodyParser, createOrderSentenceHandler)

        api.post('/exercises/vocabulary', jsonBodyParser, createVocabularyHandler)

        api.get('/exercises/:activityId/count', getExercisesCountHandler)

        api.get('/exercises/:activityId', getExercisesHandler)

        api.delete('/exercises/:exerciseId', deleteExerciseHandler)

        api.patch('/exercises/:exerciseId', jsonBodyParser, editExerciseHandler)

        api.post('/answers', jsonBodyParser, submitAnswerHandler)

        api.get('/answers/:exerciseId', getAnswersHandler)

        api.delete('/answers/:activityId', deleteAnswersHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API is running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))