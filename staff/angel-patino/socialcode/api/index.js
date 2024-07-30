import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

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

/*import registerUserHandler from './handlers/registerUserHandler.js'
import authenticateUserHandler from './handlers/authenticateUserHandler.js'
import getUserNameHandler from './handlers/getUserNameHandler.js'
import getAllPostsHandler from './handlers/getAllPostsHandler.js'
import createPostHanlder from './handlers/createPostHandler.js'
import deletePostHandler from './handlers/deletePostHandler.js'
import toggleLikePostHandler from './handlers/toggleLikePostHandler.js'
import errorHandler from './handlers/errorHandler.js'
*/
const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (_, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId', getUserNameHandler)

        api.get('/posts', getAllPostsHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.patch('/posts/:postId/likes', toggleLikePostHandler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))