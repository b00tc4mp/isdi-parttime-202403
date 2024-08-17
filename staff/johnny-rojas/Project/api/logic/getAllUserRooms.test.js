import 'dotenv/config'
import mongoose from 'mongoose'

import getAllUserRooms from './getAllUserRooms.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllUserRooms('66c07c8fe3ae460cf6cd1924')
        .then(rooms => console.log('rooms retrieved', rooms))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))