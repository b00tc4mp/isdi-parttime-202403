import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {
  authenticateUserHandler,
  registerUserHandler,
  getUserNameHandler,
  getAllPostsHandler,
  createPostHandler,
  deletePostHandler,
  toggleLikePostHandler,
} from './handlers/index.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    const api = express()

    api.use(express.static('public'))

    api.use(cors())

    api.get('/', (req, res) => res.send('Hello, World!'))

    const jsonBodyParser = express.json({
      strict: true,
      type: 'application/json',
    })

    api.post('/users', jsonBodyParser, registerUserHandler)

    api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

    api.get('/users/:targetUserId', getUserNameHandler)

    api.get('/posts', getAllPostsHandler)

    api.post('/posts', jsonBodyParser, createPostHandler)

    api.delete('/posts/:postId', deletePostHandler)

    api.patch('/posts/:postId/likes', toggleLikePostHandler)

    api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
  })
  .catch((error) => console.error(error))
