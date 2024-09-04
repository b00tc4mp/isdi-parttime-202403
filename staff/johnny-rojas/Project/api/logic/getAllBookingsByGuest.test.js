import 'dotenv/config'
import mongoose from 'mongoose'

import getAllBookingByGuest from './getAllBookingsByGuest.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllBookingByGuest('66c0a4d90d34f1b65127198b')
        .then(bookings => console.log('bookings retrived', bookings))
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))