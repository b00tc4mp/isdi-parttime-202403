import 'dotenv/config'
import mongoose from 'mongoose'

import getRoomBookings from './getRoomBookings.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoomBookings('66c32e763d6e3738931a587e')
        .then(bookings => console.log('bookings retrieved', bookings))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))