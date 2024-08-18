import 'dotenv/config'
import mongoose from 'mongoose'

import closeAccount from './closeAccount.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      closeAccount('66c1b7bd68484bd7b5e4e3e4', '1234')
        .then(() => console.log('account closed'))
      .catch((error) => console.error(error))
    } catch (error) {
      console.error(error.message)
    }
  })
  .catch(error => console.log(error.message))