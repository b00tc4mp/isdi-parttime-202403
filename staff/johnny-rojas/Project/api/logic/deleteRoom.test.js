import 'dotenv/config'
import mongoose from 'mongoose'

import deleteRoom from './deleteRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      deleteRoom('66c450614e91d30634585969', '66c450814e91d3063458596f')
        .then(() => console.log('room deleted'))
        .catch((error) => console.error(error))

    } catch (error) {
      console.error(error.message)
    }
  })
  .catch(error => console.log(error.message))