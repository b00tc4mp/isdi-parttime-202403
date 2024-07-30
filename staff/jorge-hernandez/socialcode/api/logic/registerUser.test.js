import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    try {
      registerUser(
        'Jorge',
        'Moreno',
        'jorge@moreno.com',
        'Jorge',
        '123123123',
        '123123123'
      )
        .then(() => {
          console.log('user registered')
        })
        .catch((error) => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))
