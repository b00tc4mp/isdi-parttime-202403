import 'dotenv/config'
import mongoose from 'mongoose'

import getBlockedDatesByRoom from './getBlockedDatesByRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getBlockedDatesByRoom('66bb9839a3b4be3d66985b62')
        .then(bookings => console.log(bookings))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))