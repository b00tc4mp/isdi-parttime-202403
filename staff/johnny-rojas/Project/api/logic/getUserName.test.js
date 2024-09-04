import 'dotenv/config'
import mongoose from 'mongoose'
import getUserName from './getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getUserName('66c6141fe81a1a55b177e8f6')
        .then(name => { console.log('user name', name) })
        .catch(error => { console.error(error) })
      
    } catch (error) {
      console.error(error)
  }
  })
.catch(error => console.error(error))