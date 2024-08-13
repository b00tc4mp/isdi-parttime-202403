import 'dotenv/config'
import mongoose from 'mongoose'

import getAllUserRooms from './getAllUserRooms.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllUserRooms('66bb93f629f8c00d8219baab')
        .then(rooms => console.log('rooms retrieved', rooms))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))