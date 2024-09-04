import 'dotenv/config'
import mongoose from 'mongoose'

import getAllBookings from './getAllBookings.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllBookings()
        .then(bookings => console.log('bookings retrived', bookings))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))