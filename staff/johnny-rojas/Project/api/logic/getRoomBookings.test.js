import 'dotenv/config'
import mongoose from 'mongoose'

import getRoomBookings from './getRoomBookings.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoomBookings('66c474ec6b12eb2a90b58698')
        .then(bookings => console.log('bookings retrieved', bookings))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))