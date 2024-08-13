import 'dotenv/config'
import mongoose from 'mongoose'

import deleteRoom from './deleteRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      deleteRoom('66bb93f629f8c00d8219baab', '66bb98d201b7633eacf7cfdc')
        .then(() => console.log('room deleted'))
      .catch((error) => console.error(error))
    
    } catch (error) {
      console.error(error.message)
  }
  })
.catch(error => console.log(error.message))