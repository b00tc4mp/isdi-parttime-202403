import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {
    enrollUserHandler,
    authenticateUserHandler,
    getAllUsersHandler,
    getAvailableUsersHandler,
    modifyUserHandler,
    modifyUserAvailableHandler,
    deleteUserHandler,
    
    addTaskHandler,
    getAvailableTasksHandler,
    getMyTasksHandler,
    getMyPrivateTasksHandler,
    getMyInProgressTasksHandler,
    getMyFinishedTasksHandler,
    selectTaskHandler,
    modifyTaskAsOwnerHandler,
    modifyTaskAsCreatorHandler,
    finishTaskHandler,
    releaseTaskHandler,
    deleteTaskHandler,
    errorHandler
} from './handlers/index.js'

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()
        
        api.use(cors())

        api.get('/', (_, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, enrollUserHandler)
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        api.get('/users', getAllUsersHandler)
        api.get('/users/available-users', getAvailableUsersHandler)
        api.patch('/users/modify', jsonBodyParser, modifyUserHandler)
        api.patch('/users/:userToModifyId', jsonBodyParser, modifyUserAvailableHandler)
        api.delete('/users/:userToDeleteId', deleteUserHandler)
        
        api.post('/tasks', jsonBodyParser, addTaskHandler)
        api.get('/tasks/available-tasks', getAvailableTasksHandler)
        api.get('/tasks/my-tasks', getMyTasksHandler)
        api.get('/tasks/my-in-progress-tasks', getMyInProgressTasksHandler)
        api.get('/tasks/my-private-tasks', getMyPrivateTasksHandler)
        api.get('/tasks/my-finished-tasks', getMyFinishedTasksHandler)
        api.patch('/tasks/:taskId', selectTaskHandler)
        api.patch('/tasks/:taskId/modify-as-owner', jsonBodyParser, modifyTaskAsOwnerHandler)
        api.patch('/tasks/:taskId/modify-as-creator', jsonBodyParser, modifyTaskAsCreatorHandler)
        api.patch('/tasks/:taskId/finish', jsonBodyParser, finishTaskHandler)
        api.patch('/tasks/:taskId/release', jsonBodyParser, releaseTaskHandler)
        api.delete('/tasks/:taskId', deleteTaskHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))
