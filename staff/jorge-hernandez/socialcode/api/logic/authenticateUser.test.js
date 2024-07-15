import 'dotenv/config'
import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

const { MONGODB_URL } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    try {
      authenticateUser('Jorge', '123123123')
        .then((userId) => console.log('user authenticated', userId))
        .catch((error) => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))
