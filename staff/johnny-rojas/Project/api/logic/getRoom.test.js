import 'dotenv/config'
import mongoose from 'mongoose'

import getRoom from './getRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoom('66c07c8fe3ae460cf6cd1924','66bfd6ae2e49ad6a5587ec19')
        .then(room => console.log(room))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))

  //TODO REVISAR