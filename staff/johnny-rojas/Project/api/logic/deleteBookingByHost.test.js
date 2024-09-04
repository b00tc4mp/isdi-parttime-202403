import 'dotenv/config'
import mongoose from 'mongoose'
import deleteBookingByHost from './deleteBookingByHost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      deleteBookingByHost('66c1ec47410592321e42985d', '66c1fea81563dd33607b0b8c', '66c214e6444462cffa2dbda3')
        .then(() => console.log('deleted booking'))
        .catch(error => console.error(error))
      
    } catch (error) {
      console.error(error)
    }
  })
.catch(error => console.error(error))