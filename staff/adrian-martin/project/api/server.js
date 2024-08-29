import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {
    registerUserHandler,
    authenticateUserHandler,
    errorHandler,
    getUserNameHandler,
    editUsernameHandler,
    createGameHandler,
    getAllGamesHandler,
    editGameHandler,
    deleteGameHandler,
    getAllGamesUserHandler,
    getAllUsersHandler,
    getTargetProfileHandler,
    getAllGamesTargetUserHandler
} from './handlers/index.js'

const { PORT, MONGODB_URL } = process.env

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()
        api.use(cors())

        api.get('/', (_, res) => {
            res.send('hello world')
        })

        api.get('/users/socialList', getAllUsersHandler)

        api.get('/profile/:targetProfileId', getTargetProfileHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId', getUserNameHandler)

        api.patch('/profile/:userId/editUsername', jsonBodyParser, editUsernameHandler)

        api.post('/games', jsonBodyParser, createGameHandler)

        api.get('/games', getAllGamesHandler)

        api.get('/games/:userId', getAllGamesUserHandler)

        api.patch('/games/:userId/:gameId/edit', jsonBodyParser, editGameHandler)

        api.delete('/games/:gameId', deleteGameHandler)

        api.get('/sociallist/:targetUserId/games', getAllGamesTargetUserHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`Tamo laiiiffff on http://localhost:${PORT}`))
    })
    .catch(error => console.error(error))