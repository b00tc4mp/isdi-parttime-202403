import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import jwt from './util/jsonwebtoken-promised.js'

import routeHandler from './handlers/index.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const { JsonWebTokenError, TokenExpiredError } = jwt

        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, routeHandler.registerUserHandler)

        api.post('/users/auth', jsonBodyParser, routeHandler.authenticateUserHandler)

        api.get('/users/:targetUserId', routeHandler.getUsernameHandler)

        api.get('/posts', routeHandler.getAllPostsHandler)

        api.post('/posts', jsonBodyParser, routeHandler.createPostHandler)

        api.delete('/posts/:postId', routeHandler.deletePostHandler)

        api.patch('/posts/:postId/likes',routeHandler.toggleLikePostHandle)

        api.patch('/posts/:postID/comments', routeHandler.createCommentPostHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
     .catch(error => console.error(error))