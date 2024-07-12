import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routeHandler from './handlers/index.js'

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
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

        api.patch('/posts/:postId/likes', routeHandler.toggleLikePostHandler)

        api.patch('/posts/:postId/comments', jsonBodyParser, routeHandler.createPostCommentHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))

    })
    .catch(error => console.error(error))


