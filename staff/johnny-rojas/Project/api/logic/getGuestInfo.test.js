import 'dotenv/config'
import mongoose from 'mongoose'

import getGuestInfo from './getGuestInfo.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getGuestInfo('66be8d5af11ac63268e92eda', '66bde12722701730f1200755')
        .then(booking => console.log(booking))
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  })
  .catch(error => console.log(error))
