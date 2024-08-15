import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {
    enrollUserHandler,
    authenticateUserHandler,
    
    addTaskHandler,
    deleteTaskHandler,
    getMyTasksHandler,
    getMyPrivateTasksHandler,
    getMyInProgressTasksHandler,
    getMyFinishedTasksHandler,
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
        api.post('/tasks', jsonBodyParser, addTaskHandler)
        api.get('/tasks/myTasks', getMyTasksHandler)
        api.get('/tasks/myInProgressTasks', getMyInProgressTasksHandler)
        api.get('/tasks/myPrivateTasks', getMyPrivateTasksHandler)
        api.get('/tasks/myFinishedTasks', getMyFinishedTasksHandler)
        api.delete('/tasks/:taskId', deleteTaskHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))
