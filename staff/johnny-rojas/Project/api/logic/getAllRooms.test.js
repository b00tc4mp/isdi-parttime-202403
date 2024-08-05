import 'dotenv/config'
import mongoose from 'mongoose'

import getAllRooms from './getAllRooms.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllRooms('66af42a2ca2412f76bd80be7')
        .then(rooms => console.log('rooms retrieved', rooms))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))