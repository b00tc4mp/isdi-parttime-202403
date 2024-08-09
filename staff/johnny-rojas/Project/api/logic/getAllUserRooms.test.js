import 'dotenv/config'
import mongoose from 'mongoose'

import getAllUserRooms from './getAllUserRooms.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllUserRooms('66b678d7f8e1d9c3db91720e')
        .then(rooms => console.log('rooms retrieved', rooms))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))