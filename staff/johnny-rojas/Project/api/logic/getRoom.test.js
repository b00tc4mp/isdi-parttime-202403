import 'dotenv/config'
import mongoose from 'mongoose'

import getRoom from './getRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoom('66b3ea71f947c93077ed0adb','66b3f5a64551a5b6dbe33cca')
        .then(room => console.log(room))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))