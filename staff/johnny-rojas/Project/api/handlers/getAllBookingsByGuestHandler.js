import 'dotenv/config'
import logic from '../logic/index.js'
import { CredentialsError, SystemError } from 'com/errors.js'
import jwt from '../util/jwtoken-promised.js'

const { JWT_SECRET } = process.env

const getAllBookingsByGuestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        try {
          logic.getAllBookingsByGuest(userId)
            .then(bookings => {
              res.status(200).json(bookings)
            })
            .catch(error => {
              next(new SystemError(error.message))
            })

        } catch (error) {
          next(error)
        }
      })
      .catch(error => next(new CredentialsError(error.message)))
  } catch (error) {
    next(error)
  }

}

export default getAllBookingsByGuestHandler