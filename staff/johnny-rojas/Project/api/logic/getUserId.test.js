import 'dotenv/config'
import mongoose from 'mongoose'

import getUserId from './getUserId.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getUserId('66bb93f629f8c00d8219baab')
        .then(name => console.log(name))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))