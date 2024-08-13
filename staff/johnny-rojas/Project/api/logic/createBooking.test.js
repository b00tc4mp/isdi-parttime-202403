import 'dotenv/config'
import mongoose from 'mongoose'
import createBooking from './createBooking.js'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createBooking('66b76351c316c71376f20b2f', '66bb9839a3b4be3d66985b62', '2024-09-10', '2024-09-15')
        .then((booking) => console.log(booking))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))