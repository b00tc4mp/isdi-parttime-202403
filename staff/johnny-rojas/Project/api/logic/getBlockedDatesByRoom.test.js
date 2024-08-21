import 'dotenv/config'
import mongoose from 'mongoose'

import getBlockedDatesByRoom from './getBlockedDatesByRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getBlockedDatesByRoom('66c499be379079ad3ca002a2')
        .then(bookings => console.log(bookings))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))