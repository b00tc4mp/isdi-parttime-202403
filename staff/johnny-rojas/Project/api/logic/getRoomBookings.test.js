import 'dotenv/config'
import mongoose from 'mongoose'

import getRoomBookings from './getRoomBookings.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoomBookings('66b9ceca7fa1ab9bd25e042e')
        .then(bookings => console.log('bookings retrieved', bookings))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))