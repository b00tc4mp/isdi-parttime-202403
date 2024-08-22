import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {
    registerUserHandler,
    authenticateUserHandler,
    createAdHandler,
    getAllAdsHandler,
    deleteAdHandler,
    getUserInfoHandler,
    createAdCommentHandler,
    getAdHandler,
    errorHandler
} from './handlers/index.js'


const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (_, res) => res.send('Hello, Farmfan!'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.post('/ads', jsonBodyParser, createAdHandler)

        api.get('/ads', getAllAdsHandler)

        api.get('/users/:targetUserId', getUserInfoHandler)

        api.delete('/ads/:adId', deleteAdHandler)

        api.patch('/ads/:adId/comments', jsonBodyParser, createAdCommentHandler)

        api.get('/ads/:adId', getAdHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))


