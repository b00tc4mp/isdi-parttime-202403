import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

//import logic from './logic/index.js'
//import { CredentialsError, SystemError } from 'com/errors.js'
//import handleErrorResponse from './helper/handleErrorResponse.js'
//import jwt from './util/jwt-promised.js'

import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    createPostHandler,
    getAllPostsHandler,
    deletePostHandler,
    toggleLikePostHandler,
    errorHandler
} from './handlers/index.js'

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (_, res) => res.send("It's Alive!!!"))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId', getUserNameHandler)

        api.get('/posts', createPostHandler)

        api.post('/posts', jsonBodyParser, getAllPostsHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.patch('/posts/:postId/likes', toggleLikePostHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))