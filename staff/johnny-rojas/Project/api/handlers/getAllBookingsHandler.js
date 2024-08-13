import 'dotenv/config'
import logic from '../logic/index.js'
import { SystemError } from 'com/errors.js'

const getAllBookingsHandler = (req, res, next) => {

  logic.getAllBookings()
    .then(bookings => {
      res.status(200).json(bookings)
    })
    .catch(error => {
      next(new SystemError(error.message))
    })

}

export default getAllBookingsHandler