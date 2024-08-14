import 'dotenv/config'
import mongoose from 'mongoose'

import getRoomBookings from './getRoomBookings.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoomBookings('66bb9839a3b4be3d66985b62')
        .then(bookings => console.log('bookings retrieved', bookings))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))