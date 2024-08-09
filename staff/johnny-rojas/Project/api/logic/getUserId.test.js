import 'dotenv/config'
import mongoose from 'mongoose'

import getUserId from './getUserId.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getUserId('66b60f11c1f8d459596eff48')
        .then(name => console.log(name))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))