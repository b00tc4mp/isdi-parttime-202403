import 'dotenv/config'
import mongoose from 'mongoose'

import registerArtist from '../registerArtist.js'

const { MONGODB_URL } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    try {
      registerArtist(
        'David',
        'David Bisbal',
        'cantante',
        'Madrid',
        'Buleria Buleria',
        'david@bisbal.com',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        'https',
        '123123123',
        '123123123'
      )
        .then(() => console.log('user registered'))
        .catch((error) => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))
