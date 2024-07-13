import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import handlers from './handlers/index.js'

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        // api.use([express.static("public"), express.json(), cors()]); //Todo junto

        api.post('/users', jsonBodyParser, handlers.registerUserHandler)

        api.post('/users/auth', jsonBodyParser, handlers.authenticateUserHandler)

        api.get('/users/:targetUserId', handlers.getUserNameHandler)

        api.get('/posts', handlers.getAllPostsHandler)

        api.post('/posts', jsonBodyParser, handlers.createPostHandler)

        api.delete('/posts/:postId', handlers.deletePostHandler)

        api.patch('/posts/:postId/likes', handlers.toggleLikePostHandler)

        api.patch('posts/:postId/comments', jsonBodyParser, handlers.createPostCommentHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))