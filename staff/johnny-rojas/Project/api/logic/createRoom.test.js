import 'dotenv/config'
import mongoose from 'mongoose'
import createRoom from './createRoom.js'

const { MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createRoom('66bb93f629f8c00d8219baab', 'TEST2', 'Este', 'Anzoategui, El tigre', 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 'hab doble', '5344 USD')
        .then((room) => console.log(room))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))