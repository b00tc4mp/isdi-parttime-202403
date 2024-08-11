import 'dotenv/config'
import mongoose from 'mongoose'

import getAllUserRooms from './getAllUserRooms.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllUserRooms('66b76319062100685bff2645')
        .then(rooms => console.log('rooms retrieved', rooms))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))