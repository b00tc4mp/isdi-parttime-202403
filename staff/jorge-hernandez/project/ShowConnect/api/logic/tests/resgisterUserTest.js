import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from '../registerUser.js'

const { MONGODB_URL } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    try {
      registerUser(
        'Felix',
        'Felix el gato',
        'humorista',
        'madrid',
        'Humor se escribe con H',
        'felix@elgato.com',
        'http://',
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
