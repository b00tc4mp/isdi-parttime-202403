import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { authenticateUserHandler, errorHandler, registerUserHandler, getUserNameHandler, getAllPostsHandler, createPostHandler, deletePostHandler, toggleLikeHundler } from './handlers/index.js'

import createPostCommentHandler from './handlers/createPostCommentHandler.js'
import editPostTitleHundler from './handlers/editPostTitleHundler.js'


const { MONGODB_URL, PORT } = process.env


mongoose.connect(MONGODB_URL)
    .then(() => {

        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.get('/', (req, res) => res.send('Hello, World!'))

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId', getUserNameHandler)

        api.get('/posts', getAllPostsHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.patch('/posts/:postId/likes', toggleLikeHundler)

        api.patch('/posts/:postId/comments', jsonBodyParser, createPostCommentHandler)

        api.patch('/posts/:postId/edit', jsonBodyParser, editPostTitleHundler)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API is up on PORT ${PORT}`))
    })
    .catch(error => console.error(error))
