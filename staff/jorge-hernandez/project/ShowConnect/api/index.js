import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import registerUserHandler from './handlers/registerUserHandler.js'
import authenticateUserHandler from './handlers/authenticateUserHandler.js'
import getUserNameHandler from './handlers/getUserNameHandler.js'
import createChatHandler from './handlers/createChatHandler.js'

const { MONGODB_URL, PORT } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    const api = express()

    const jsonbodyparser = express.json({
      strict: true,
      type: 'application/json',
    })

    api.use(
      cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      })
    )

    api.get('/', (_, res) => res.send('Hello World'))

    api.post('/users', jsonbodyparser, registerUserHandler)

    api.post('/chats', jsonbodyparser, createChatHandler)

    api.post('/users/auth', jsonbodyparser, authenticateUserHandler)

    api.get('/users/:targetUserId', getUserNameHandler)

    api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
  })
  .catch((error) => console.error(error))
