import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import registerArtistHandler from './handlers/registerArtistHandler.js'
import authenticateUserHandler from './handlers/authenticateUserHandler.js'
import getArtistDataHandler from './handlers/getArtistDataHandler.js'
import updateChatWithMessageHandler from './handlers/updateChatWithMessageHandler.js'
import getArtistsByCityHandler from './handlers/getArtistsByCityHandler.js'
import updateArtistHandler from './handlers/updateArtistHandler.js'
import registerClientHandler from './handlers/registerClientHandler.js'
import getUserChatsAndMessagesHandler from './handlers/getUserChatsAndMessagesHandler.js'
import createNewChatAndMessageHandler from './handlers/createNewChatAndMessageHandler.js'
import errorHandler from './handlers/errorHandler.js'
import deleteDateHandler from './handlers/deleteDateHandler.js'

const { MONGODB_URL, PORT } = process.env

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const api = express()

    const jsonbodyparser = express.json({
      strict: true,
      type: 'application/json',
    })

    api.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      })
    )

    api.get('/', (_, res) => res.send('Hello World'))

    api.post('/users/auth', jsonbodyparser, authenticateUserHandler)

    api.put('/users/:userId', jsonbodyparser, updateArtistHandler)

    api.get('/users/:targetUserId', getArtistDataHandler)

    api.post('/users/clients', jsonbodyparser, registerClientHandler)

    api.post('/users/artists', jsonbodyparser, registerArtistHandler)

    api.delete(
      '/users/artists/:artistId/dates/:date',
      jsonbodyparser,
      deleteDateHandler
    )

    api.get(
      '/users/city/:city/discipline/:discipline/dates/:excludedDate',
      getArtistsByCityHandler
    )

    api.post('/messages', jsonbodyparser, updateChatWithMessageHandler)

    api.post('/messages/create', jsonbodyparser, createNewChatAndMessageHandler)

    api.get('/chats/:userId', jsonbodyparser, getUserChatsAndMessagesHandler)

    api.use(errorHandler)

    api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
  })
  .catch((error) => console.error(error))
