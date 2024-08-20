import 'dotenv/config'
import mongoose from 'mongoose'

import getRoom from './getRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoom('66c450614e91d30634585969','66c45810712a328432707d2c')
        .then(() => { })
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))