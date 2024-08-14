import 'dotenv/config'
import mongoose from 'mongoose'

import closeAccount from './closeAccount.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      closeAccount('66bbdd6d7196c3c7d1a54dbe', '1234')
        .then(() => console.log('account closed'))
      .catch((error) => console.error(error))
    } catch (error) {
      console.error(error.message)
    }
  })
  .catch(error => console.log(error.message))