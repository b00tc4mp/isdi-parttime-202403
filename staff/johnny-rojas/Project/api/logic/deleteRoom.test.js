import 'dotenv/config'
import mongoose from 'mongoose'

import deleteRoom from './deleteRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      deleteRoom('66b76351c316c71376f20b2f', '66b873ff2e268693ac537cf8')
        .then(() => console.log('room delete'))
      .catch((error) => console.error(error))
    
    } catch (error) {
      console.error(error.message)
  }
  })
.catch(error => console.log(error.message))