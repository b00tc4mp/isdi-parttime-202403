import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    errorHandler
} from './handlers/index.js'

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (_, res) => res.send('Hello, RecipeBox'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId', getUserNameHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))

    })
    .catch(error => console.error(error))