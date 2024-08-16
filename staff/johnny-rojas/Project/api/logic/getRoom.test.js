import 'dotenv/config'
import mongoose from 'mongoose'

import getRoom from './getRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getRoom('66bc4d5da53be0a8d00fad7b','66bccec2edd561086f425050')
        .then(room => console.log(room))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))

  //TODO REVISAR