import 'dotenv/config'
import mongoose from 'mongoose'
import createBooking from './createBooking.js'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createBooking('66bde12722701730f1200755', '66bb037f5409762466328478', '2024-09-10', '2024-09-15')
        .then((booking) => console.log(booking))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))