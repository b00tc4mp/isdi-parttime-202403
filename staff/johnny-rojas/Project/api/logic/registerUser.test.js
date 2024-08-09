import 'dotenv/config'
import mongoose from 'mongoose'
import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      registerUser('jack', 'jose', 'jacjk@jose.com', '+58 412 876 5536', '1234', '1234')
        .then((user) => {console.log(user) })
        .catch(error => console.log(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))

