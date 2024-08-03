import 'dotenv/config'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      Booking('Hotel Humbolt', 'Habitacion doble','2024-08-01T00:00:00.000Z', '2024-08-02T00:00:00.000Z', 'not available')
.then(()=> res)
    } catch (error) {

    }
  })
  .catch(error => console.error(error))