import 'dotenv/config'
import mongoose from 'mongoose'
import createChat from '../createChat.js'

const { MONGODB_URL } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB')

    const userId = '64c99c9b6f9a2d0021e3db9d'
    const message = 'Hola'

    createChat(userId, message)
      .then((chat) => {
        console.log('Chat created:', chat)
      })
      .catch((error) => {
        console.error('Error creating chat:', error)
      })
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error))
