import 'dotenv/config'
import mongoose from 'mongoose'

import editUserContact from './editUserContact.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      editUserContact('66bbdd6d7196c3c7d1a54dbe',
        {
          email: 'test@test.com',
          phone: '+58 412 000 0000'
        }
      )
        .then(() => {
          console.log('user contact edited')
        })
        .catch((error) => console.log(error.message))

    } catch (error) {
      console.log(error.message)
    }
  })
.catch(error => console.log(error.message))