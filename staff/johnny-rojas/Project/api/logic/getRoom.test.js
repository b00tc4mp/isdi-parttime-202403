import 'dotenv/config'
import mongoose from 'mongoose'

import getRoom from './getRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoom('66acf8a315e545a4d2f06a3b','66b118ad1573bbbffe4aff13')
        .then(room => console.log(room))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))